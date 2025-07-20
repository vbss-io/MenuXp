import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreditCardIcon,
  ForkKnifeIcon,
  MoneyIcon,
  MotorcycleIcon,
  QrCodeIcon,
  StorefrontIcon
} from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Checkbox } from '@vbss-ui/checkbox'
import { Input } from '@vbss-ui/input'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UpdateRestaurantSettingsUsecase } from '@/application/restaurants/update-restaurant-settings.usecase'
import { OperationType, operationTypes } from '@/domain/enums/restaurants/operation-type.enum'
import { PaymentMethod, paymentMethods } from '@/domain/enums/restaurants/payment-methods.enum'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

const operationsSchema = z.object({
  operationTypes: z.array(z.nativeEnum(OperationType)).min(1, 'Selecione pelo menos um tipo de operação'),
  paymentMethods: z.array(z.nativeEnum(PaymentMethod)).min(1, 'Selecione pelo menos um método de pagamento'),
  deliveryFee: z.number().min(0, 'Taxa de entrega deve ser maior ou igual a 0').optional()
})

type OperationsFormData = z.infer<typeof operationsSchema>

const operationTypeLabels = {
  [OperationType.DELIVERY]: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <MotorcycleIcon size={16} />
      <span>Delivery</span>
    </div>
  ),
  [OperationType.BALCAO]: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <StorefrontIcon size={16} />
      <span>Balcão</span>
    </div>
  ),
  [OperationType.MESA]: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <ForkKnifeIcon size={16} />
      <span>Mesa</span>
    </div>
  )
}

const paymentMethodLabels = {
  [PaymentMethod.CARTAO_CREDITO]: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <CreditCardIcon size={16} />
      <span>Cartão de Crédito</span>
    </div>
  ),
  [PaymentMethod.CARTAO_DEBITO]: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <CreditCardIcon size={16} />
      <span>Cartão de Débito</span>
    </div>
  ),
  [PaymentMethod.PIX]: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <QrCodeIcon size={16} />
      <span>PIX</span>
    </div>
  ),
  [PaymentMethod.DINHEIRO]: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <MoneyIcon size={16} />
      <span>Dinheiro</span>
    </div>
  )
}

export const OperationsForm = () => {
  const { restaurant, refreshRestaurant } = useRestaurant()
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOperationTypes, setSelectedOperationTypes] = useState<OperationType[]>(
    restaurant?.settings?.operationTypes ?? []
  )
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<PaymentMethod[]>(
    restaurant?.settings?.paymentMethods ?? []
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<OperationsFormData>({
    resolver: zodResolver(operationsSchema),
    defaultValues: {
      operationTypes: restaurant?.settings?.operationTypes ?? [],
      paymentMethods: restaurant?.settings?.paymentMethods ?? [],
      deliveryFee: restaurant?.settings?.deliveryFee ?? 0
    }
  })

  const watchedOperationTypes = watch('operationTypes')
  const hasDelivery = watchedOperationTypes?.includes(OperationType.DELIVERY)

  useEffect(() => {
    setValue('operationTypes', selectedOperationTypes)
  }, [selectedOperationTypes, setValue])

  useEffect(() => {
    setValue('paymentMethods', selectedPaymentMethods)
  }, [selectedPaymentMethods, setValue])

  const handleOperationTypeChange = (operationType: OperationType, checked: boolean) => {
    if (checked) {
      setSelectedOperationTypes((prev) => [...prev, operationType])
    } else {
      setSelectedOperationTypes((prev) => prev.filter((type) => type !== operationType))
    }
  }

  const handlePaymentMethodChange = (paymentMethod: PaymentMethod, checked: boolean) => {
    if (checked) {
      setSelectedPaymentMethods((prev) => [...prev, paymentMethod])
    } else {
      setSelectedPaymentMethods((prev) => prev.filter((method) => method !== paymentMethod))
    }
  }

  const onSubmit = async (data: OperationsFormData) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const updateSettingsUsecase = new UpdateRestaurantSettingsUsecase()
      await updateSettingsUsecase.execute({
        restaurantId,
        operationTypes: data.operationTypes,
        paymentMethods: data.paymentMethods,
        deliveryFee: hasDelivery ? (data?.deliveryFee ?? 0) : 0,
        businessHours: restaurant?.settings?.businessHours ?? undefined,
        templates: restaurant?.settings?.templates ?? undefined
      })
      toast.success('Configurações de operações atualizadas com sucesso!')
      await refreshRestaurant()
    } catch (error) {
      toast.error('Erro ao atualizar configurações de operações')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
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
    <S.FormContainer onSubmit={handleSubmit(onSubmit)} variants={containerVariants} initial="hidden" animate="visible">
      <S.Section variants={sectionVariants}>
        <S.SectionTitle>Tipos de Operação</S.SectionTitle>
        <S.SectionDescription>Selecione os tipos de operação que seu restaurante oferece</S.SectionDescription>
        <S.CheckboxGrid>
          {operationTypes.map((operationType) => (
            <S.CheckboxItem key={operationType} variants={formGroupVariants}>
              <Checkbox
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label={operationTypeLabels[operationType] as any}
                checked={selectedOperationTypes.includes(operationType)}
                onCheckedChange={(checked) => handleOperationTypeChange(operationType, checked as boolean)}
                fontSize="sm"
              />
            </S.CheckboxItem>
          ))}
        </S.CheckboxGrid>
        {errors.operationTypes && <S.ErrorMessage>{errors.operationTypes.message}</S.ErrorMessage>}
      </S.Section>
      {hasDelivery && (
        <S.Section variants={sectionVariants}>
          <S.SectionTitle>Taxa de Entrega</S.SectionTitle>
          <S.SectionDescription>Configure a taxa de entrega para pedidos delivery</S.SectionDescription>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="deliveryFee">Taxa de Entrega (R$)</S.Label>
            <Input
              id="deliveryFee"
              type="number"
              step="0.01"
              min="0"
              error={errors.deliveryFee?.message}
              placeholder="0.00"
              fontSize="sm"
              {...register('deliveryFee', { valueAsNumber: true })}
            />
          </S.FormGroup>
        </S.Section>
      )}
      <S.Section variants={sectionVariants}>
        <S.SectionTitle>Métodos de Pagamento</S.SectionTitle>
        <S.SectionDescription>Selecione os métodos de pagamento aceitos pelo seu restaurante</S.SectionDescription>
        <S.CheckboxGrid>
          {paymentMethods.map((paymentMethod) => (
            <S.CheckboxItem key={paymentMethod} variants={formGroupVariants}>
              <Checkbox
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label={paymentMethodLabels[paymentMethod] as any}
                checked={selectedPaymentMethods.includes(paymentMethod)}
                onCheckedChange={(checked) => handlePaymentMethodChange(paymentMethod, checked as boolean)}
                fontSize="sm"
              />
            </S.CheckboxItem>
          ))}
        </S.CheckboxGrid>
        {errors.paymentMethods && <S.ErrorMessage>{errors.paymentMethods.message}</S.ErrorMessage>}
      </S.Section>
      <S.SubmitSection>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" disabled={isLoading} variant="primary" size="lg">
            {isLoading ? <Loading /> : 'Salvar'}
          </Button>
        </motion.div>
      </S.SubmitSection>
    </S.FormContainer>
  )
}
