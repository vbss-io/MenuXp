import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UpdateRestaurantAddressUsecase } from '@/application/restaurants/update-restaurant-address.usecase'
import { Button } from '@menuxp/ui'
import { FormInput } from '@/presentation/components/ui/form-input'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

const addressSchema = z.object({
  street: z.string().trim().min(1, 'Rua é obrigatória'),
  number: z.string().trim().min(1, 'Número é obrigatório'),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, 'Bairro é obrigatório'),
  city: z.string().trim().min(1, 'Cidade é obrigatória'),
  state: z.string().trim().min(1, 'Estado é obrigatório'),
  zipCode: z.string().trim().min(1, 'CEP é obrigatório'),
  country: z.string().trim().min(1, 'País é obrigatório')
})

type AddressFormData = z.infer<typeof addressSchema>

export const AddressForm = () => {
  const { restaurant, refreshRestaurant } = useRestaurant()
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Brasil'
    }
  })

  useEffect(() => {
    if (restaurant?.address) {
      reset({
        street: restaurant.address.street || '',
        number: restaurant.address.number || '',
        complement: restaurant.address.complement || '',
        neighborhood: restaurant.address.neighborhood || '',
        city: restaurant.address.city || '',
        state: restaurant.address.state || '',
        zipCode: restaurant.address.zipCode || '',
        country: restaurant.address.country || 'Brasil'
      })
    }
  }, [restaurant, reset])

  const onSubmit = async (data: AddressFormData) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const updateAddressUsecase = new UpdateRestaurantAddressUsecase()
      await updateAddressUsecase.execute({
        restaurantId,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country
      })
      toast.success('Endereço atualizado com sucesso!')
      await refreshRestaurant()
    } catch (error) {
      toast.error('Erro ao atualizar endereço')
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
        <S.SectionTitle>Endereço do Restaurante</S.SectionTitle>
        <S.SectionDescription>Configure o endereço físico do seu restaurante</S.SectionDescription>
        <S.FormGrid>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="street"
              label="Rua"
              placeholder="Rua das Flores"
              error={errors.street?.message}
              required
              register={register('street')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="number"
              label="Número"
              placeholder="123"
              error={errors.number?.message}
              required
              register={register('number')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="complement"
              label="Complemento"
              placeholder="Apto 45, Loja 2"
              error={errors.complement?.message}
              register={register('complement')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="neighborhood"
              label="Bairro"
              placeholder="Centro"
              error={errors.neighborhood?.message}
              required
              register={register('neighborhood')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="city"
              label="Cidade"
              placeholder="São Paulo"
              error={errors.city?.message}
              required
              register={register('city')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="state"
              label="Estado"
              placeholder="SP"
              error={errors.state?.message}
              required
              register={register('state')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="zipCode"
              label="CEP"
              placeholder="01234-567"
              error={errors.zipCode?.message}
              required
              register={register('zipCode')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="country"
              label="País"
              placeholder="Brasil"
              error={errors.country?.message}
              required
              register={register('country')}
            />
          </S.FormGroup>
        </S.FormGrid>
      </S.Section>
      <S.SubmitSection>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" disabled={isLoading} variant="primary" size="lg">
            {isLoading ? <Loading /> : 'Salvar Endereço'}
          </Button>
        </motion.div>
      </S.SubmitSection>
    </S.FormContainer>
  )
}
