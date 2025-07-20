import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UpdateRestaurantAddressUsecase } from '@/application/restaurants/update-restaurant-address.usecase'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  zipCode: z.string().min(1, 'CEP é obrigatório'),
  country: z.string().min(1, 'País é obrigatório')
})

type AddressFormData = z.infer<typeof addressSchema>

export const AddressForm = () => {
  const { restaurant, refreshRestaurant } = useRestaurant()
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: restaurant?.address?.street ?? '',
      number: restaurant?.address?.number ?? '',
      complement: restaurant?.address?.complement ?? '',
      neighborhood: restaurant?.address?.neighborhood ?? '',
      city: restaurant?.address?.city ?? '',
      state: restaurant?.address?.state ?? '',
      zipCode: restaurant?.address?.zipCode ?? '',
      country: restaurant?.address?.country ?? 'Brasil'
    }
  })

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
            <S.Label htmlFor="street">Rua *</S.Label>
            <Input
              id="street"
              type="text"
              error={errors.street?.message}
              placeholder="Rua das Flores"
              fontSize="sm"
              {...register('street')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="number">Número *</S.Label>
            <Input
              id="number"
              type="text"
              error={errors.number?.message}
              placeholder="123"
              fontSize="sm"
              {...register('number')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="complement">Complemento</S.Label>
            <Input
              id="complement"
              type="text"
              error={errors.complement?.message}
              placeholder="Apto 45, Loja 2"
              fontSize="sm"
              {...register('complement')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="neighborhood">Bairro *</S.Label>
            <Input
              id="neighborhood"
              type="text"
              error={errors.neighborhood?.message}
              placeholder="Centro"
              fontSize="sm"
              {...register('neighborhood')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="city">Cidade *</S.Label>
            <Input
              id="city"
              type="text"
              error={errors.city?.message}
              placeholder="São Paulo"
              fontSize="sm"
              {...register('city')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="state">Estado *</S.Label>
            <Input
              id="state"
              type="text"
              error={errors.state?.message}
              placeholder="SP"
              fontSize="sm"
              {...register('state')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="zipCode">CEP *</S.Label>
            <Input
              id="zipCode"
              type="text"
              error={errors.zipCode?.message}
              placeholder="01234-567"
              fontSize="sm"
              {...register('zipCode')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label htmlFor="country">País *</S.Label>
            <Input
              id="country"
              type="text"
              error={errors.country?.message}
              placeholder="Brasil"
              fontSize="sm"
              {...register('country')}
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
