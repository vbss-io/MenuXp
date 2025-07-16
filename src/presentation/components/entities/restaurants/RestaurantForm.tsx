import { RegisterRestaurantUsecase } from '@/application/restaurants/register-restaurant.usecase'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const restaurantSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  logoUrl: z.string().url('URL inválida'),
  primaryColor: z.string().min(4),
  secondaryColor: z.string().min(4),
  whatsappNumber: z.string().min(8),
  qrCodeUrl: z.string().url('URL inválida'),
  operationTypes: z.array(z.string()).min(1),
  paymentMethods: z.array(z.string()).min(1),
  deliveryFee: z.coerce.number().min(0)
})

type RestaurantFormData = z.infer<typeof restaurantSchema>

interface RestaurantFormProps {
  onSuccess: () => void
}

export const RestaurantForm = ({ onSuccess }: RestaurantFormProps) => {
  const { user } = useAuth()
  const { setRestaurant } = useRestaurant()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      operationTypes: [],
      paymentMethods: []
    }
  })

  const onSubmit = async (data: RestaurantFormData) => {
    setIsSubmitting(true)
    const registerRestaurant = new RegisterRestaurantUsecase()
    const details = await registerRestaurant.execute({ ...data, username: user?.username as string })
    setRestaurant(details)
    onSuccess()
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h2>Cadastrar Restaurante</h2>
      <Input label="Nome" {...register('name')} error={errors.name?.message} />
      <Input label="Logo URL" {...register('logoUrl')} error={errors.logoUrl?.message} />
      <Input label="Cor Primária" {...register('primaryColor')} error={errors.primaryColor?.message} />
      <Input label="Cor Secundária" {...register('secondaryColor')} error={errors.secondaryColor?.message} />
      <Input label="WhatsApp" {...register('whatsappNumber')} error={errors.whatsappNumber?.message} />
      <Input label="QR Code URL" {...register('qrCodeUrl')} error={errors.qrCodeUrl?.message} />
      {/* <Input
        label="Tipos de Operação (separe por vírgula)"
        {...register('operationTypes', {
          setValueAs: (v) =>
            v
              .split(',')
              .map((s: string) => s.trim())
              .filter(Boolean)
        })}
        error={errors.operationTypes?.message}
      /> */}
      {/* <Input
        label="Métodos de Pagamento (separe por vírgula)"
        {...register('paymentMethods', {
          setValueAs: (v) =>
            v
              .split(',')
              .map((s: string) => s.trim())
              .filter(Boolean)
        })}
        error={errors.paymentMethods?.message}
      /> */}
      <Input
        label="Taxa de Entrega"
        type="number"
        step="0.01"
        {...register('deliveryFee')}
        error={errors.deliveryFee?.message}
      />
      <Button type="submit" disabled={isSubmitting} variant="primary">
        {isSubmitting ? 'Salvando...' : 'Cadastrar'}
      </Button>
    </form>
  )
}
