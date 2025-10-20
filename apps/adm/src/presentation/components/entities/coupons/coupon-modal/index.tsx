import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { CreateCouponUsecase } from '@/application/coupons/create-coupon.usecase'
import { UpdateCouponUsecase } from '@/application/coupons/update-coupon.usecase'
import { CouponType } from '@/domain/enums/coupons/coupon-type.enum'
import type { Coupon } from '@/domain/models/coupon.model'
import { Button } from '@menuxp/ui'
import { Dialog } from '@/presentation/components/ui/dialog'
import { FormInput } from '@/presentation/components/ui/form-input'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const couponSchema = z
  .object({
    code: z
      .string()
      .min(3, 'Código deve ter no mínimo 3 caracteres')
      .max(20, 'Código deve ter no máximo 20 caracteres')
      .regex(/^[A-Z0-9]+$/, 'Código deve conter apenas letras maiúsculas e números')
      .transform((val) => val.toUpperCase()),
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: z.string().max(500, 'Descrição deve ter no máximo 500 caracteres').optional(),
    type: z.enum(['percentage', 'fixed']),
    value: z.number().min(0.01, 'Valor deve ser maior que 0'),
    maxUses: z.number().min(1, 'Quantidade de usos deve ser maior que 0'),
    validFrom: z.string().min(1, 'Data inicial é obrigatória'),
    validUntil: z.string().min(1, 'Data final é obrigatória'),
    minOrderValue: z
      .union([z.number().min(0, 'Valor mínimo do pedido deve ser maior ou igual a 0'), z.nan()])
      .optional()
      .transform((val) => (val === undefined || isNaN(val as number) ? undefined : val)),
    maxDiscountValue: z
      .union([z.number().min(0, 'Desconto máximo deve ser maior ou igual a 0'), z.nan()])
      .optional()
      .transform((val) => (val === undefined || isNaN(val as number) ? undefined : val))
  })
  .refine(
    (data) => {
      const validFrom = new Date(data.validFrom)
      const validUntil = new Date(data.validUntil)
      return validFrom < validUntil
    },
    {
      message: 'Data inicial deve ser anterior à data final',
      path: ['validFrom']
    }
  )
  .refine(
    (data) => {
      if (data.type === 'percentage' && data.value > 100) {
        return false
      }
      return true
    },
    {
      message: 'Valor percentual não pode exceder 100%',
      path: ['value']
    }
  )

type CouponFormData = z.infer<typeof couponSchema>

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
  coupon?: Coupon
  onSuccess: () => void
}

export const CouponModal = ({ isOpen, onClose, coupon, onSuccess }: CouponModalProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!coupon

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      type: 'percentage',
      value: 0,
      maxUses: 1,
      validFrom: '',
      validUntil: '',
      minOrderValue: undefined,
      maxDiscountValue: undefined
    }
  })

  const couponType = watch('type')

  useEffect(() => {
    if (isOpen) {
      if (coupon) {
        const validFrom = new Date(coupon.validFrom)
        const validUntil = new Date(coupon.validUntil)

        reset({
          code: coupon.code,
          name: coupon.name,
          description: coupon.description || '',
          type: coupon.type as 'percentage' | 'fixed',
          value: coupon.value,
          maxUses: coupon.maxUses,
          validFrom: validFrom.toISOString().split('T')[0],
          validUntil: validUntil.toISOString().split('T')[0],
          minOrderValue: coupon.minOrderValue,
          maxDiscountValue: coupon.maxDiscountValue
        })
      } else {
        const today = new Date().toISOString().split('T')[0]
        const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

        reset({
          code: '',
          name: '',
          description: '',
          type: 'percentage',
          value: 0,
          maxUses: 1,
          validFrom: today,
          validUntil: nextMonth,
          minOrderValue: undefined,
          maxDiscountValue: undefined
        })
      }
    }
  }, [isOpen, coupon, reset])

  const onSubmit = async (data: CouponFormData) => {
    if (!restaurantId) return

    setIsLoading(true)
    try {
      const validFrom = new Date(data.validFrom)
      const validUntil = new Date(data.validUntil)

      const couponData = {
        code: data.code,
        name: data.name,
        description: data.description,
        type: data.type === 'percentage' ? CouponType.PERCENTAGE : CouponType.FIXED,
        value: data.value,
        maxUses: data.maxUses,
        validFrom,
        validUntil,
        minOrderValue: data.minOrderValue,
        maxDiscountValue: data.maxDiscountValue
      }

      if (isEditing) {
        const updateCouponUsecase = new UpdateCouponUsecase()
        await updateCouponUsecase.execute({
          couponId: coupon.id,
          ...couponData
        })
        toast.success('Cupom atualizado com sucesso!')
      } else {
        const createCouponUsecase = new CreateCouponUsecase()
        await createCouponUsecase.execute({
          restaurantId,
          ...couponData
        })
        toast.success('Cupom criado com sucesso!')
      }

      onSuccess()
      onClose()
    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} cupom`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    if (isLoading) return <Loading />
    return isEditing ? 'Atualizar' : 'Criar'
  }

  const formGroupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <Dialog
      title={isEditing ? 'Editar Cupom' : 'Novo Cupom'}
      description={isEditing ? 'Edite o cupom para atualizar as informações' : 'Crie um novo cupom de desconto'}
      open={isOpen}
      onOpenChange={onClose}
    >
      <S.Form>
        <S.FormRow>
          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="code"
              label="Código"
              placeholder="Ex: DESCONTO10"
              error={errors.code?.message}
              required
              register={register('code')}
              fontSize="sm"
              disabled={isEditing}
            />
            {isEditing && <S.FieldHint>O código não pode ser alterado após a criação</S.FieldHint>}
          </S.FormGroup>

          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="name"
              label="Nome"
              placeholder="Digite o nome do cupom"
              error={errors.name?.message}
              required
              register={register('name')}
              fontSize="sm"
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <FormTextarea
            id="description"
            label="Descrição"
            placeholder="Digite uma descrição para o cupom"
            error={errors.description?.message}
            register={register('description')}
            rows={3}
          />
        </S.FormGroup>

        <S.FormRow>
          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <S.Label>
              Tipo de Desconto <span>*</span>
            </S.Label>
            <S.RadioGroup>
              <S.RadioOption>
                <input type="radio" id="percentage" value="percentage" {...register('type')} />
                <label htmlFor="percentage">Percentual (%)</label>
              </S.RadioOption>
              <S.RadioOption>
                <input type="radio" id="fixed" value="fixed" {...register('type')} />
                <label htmlFor="fixed">Valor Fixo (R$)</label>
              </S.RadioOption>
            </S.RadioGroup>
            {errors.type && <S.ErrorMessage>{errors.type.message}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="value"
              label="Valor"
              placeholder={couponType === 'percentage' ? 'Ex: 10' : 'Ex: 15.00'}
              error={errors.value?.message}
              required
              register={register('value', { valueAsNumber: true })}
              type="number"
              step={couponType === 'percentage' ? '1' : '0.01'}
              fontSize="sm"
            />
            <S.FieldHint>
              {couponType === 'percentage' ? 'Percentual de desconto (até 100%)' : 'Valor fixo em reais'}
            </S.FieldHint>
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="maxUses"
              label="Quantidade de Usos"
              placeholder="Ex: 100"
              error={errors.maxUses?.message}
              required
              register={register('maxUses', { valueAsNumber: true })}
              type="number"
              step="1"
              fontSize="sm"
            />
          </S.FormGroup>

          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="minOrderValue"
              label="Valor Mínimo do Pedido (Opcional)"
              placeholder="Ex: 50.00"
              error={errors.minOrderValue?.message}
              register={register('minOrderValue', { valueAsNumber: true })}
              type="number"
              step="0.01"
              fontSize="sm"
            />
          </S.FormGroup>
        </S.FormRow>

        {couponType === 'percentage' && (
          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="maxDiscountValue"
              label="Desconto Máximo (Opcional)"
              placeholder="Ex: 50.00"
              error={errors.maxDiscountValue?.message}
              register={register('maxDiscountValue', { valueAsNumber: true })}
              type="number"
              step="0.01"
              fontSize="sm"
            />
            <S.FieldHint>Limite máximo de desconto em reais para cupons percentuais</S.FieldHint>
          </S.FormGroup>
        )}

        <S.FormRow>
          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="validFrom"
              label="Válido de"
              error={errors.validFrom?.message}
              required
              register={register('validFrom')}
              type="date"
              fontSize="sm"
            />
          </S.FormGroup>

          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="validUntil"
              label="Válido até"
              error={errors.validUntil?.message}
              required
              register={register('validUntil')}
              type="date"
              fontSize="sm"
            />
          </S.FormGroup>
        </S.FormRow>

        <S.ModalFooter>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="primary" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
              {getButtonText()}
            </Button>
          </motion.div>
        </S.ModalFooter>
      </S.Form>
    </Dialog>
  )
}
