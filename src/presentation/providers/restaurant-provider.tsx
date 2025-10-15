import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import {
  GetRestaurantByIdUsecase,
  type RestaurantConfigValidation
} from '@/application/restaurants/get-restaurant-by-id.usecase'
import type { Restaurant } from '@/domain/models/restaurant.model'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'
import { RestaurantContext } from '@/presentation/contexts/restaurant-context'
import { useAuth } from '@/presentation/hooks/use-auth'

interface RestaurantProviderProps {
  children: React.ReactNode
}

const validateRestaurantConfig = (restaurant: Restaurant, isClient = false): RestaurantConfigValidation => {
  const missingConfigs: string[] = []
  const hasAddress = !!(
    restaurant.address?.street &&
    restaurant.address?.number &&
    restaurant.address?.neighborhood &&
    restaurant.address?.city &&
    restaurant.address?.state &&
    restaurant.address?.zipCode &&
    restaurant.address?.country
  )
  if (!hasAddress) missingConfigs.push('Endereço')
  const hasContactInfo = !!(restaurant.contactInfo?.phone && restaurant.contactInfo?.email)
  if (!hasContactInfo) missingConfigs.push('Informações de Contato')
  const hasOperationSettings = !!(
    restaurant.settings?.operationTypes &&
    restaurant.settings.operationTypes.length > 0 &&
    restaurant.settings?.paymentMethods &&
    restaurant.settings.paymentMethods.length > 0 &&
    restaurant.settings?.deliveryFee !== undefined
  )
  if (!hasOperationSettings) missingConfigs.push('Configurações de Operação')
  const hasOperationHours = !!restaurant.settings?.businessHours
  if (!hasOperationHours) missingConfigs.push('Horários de Funcionamento')
  const hasTemplates = isClient ? true : !!restaurant.settings?.templates
  if (!hasTemplates) missingConfigs.push('Templates de Mensagens')
  const isReadyForOperation = hasAddress && hasContactInfo && hasOperationSettings && hasOperationHours && hasTemplates
  return {
    hasAddress,
    hasContactInfo,
    hasOperationSettings,
    hasOperationHours,
    hasTemplates,
    missingConfigs,
    isReadyForOperation
  }
}

export const RestaurantProvider = ({ children }: RestaurantProviderProps) => {
  const { restaurantId } = useAuth()
  const localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  const getRestaurantUsecase = useMemo(() => new GetRestaurantByIdUsecase(), [])

  const [restaurant, setRestaurant] = useState<Restaurant | null>(localStorage.get('restaurant'))
  const [operationId, setOperationId] = useState<string | null>(localStorage.get('operationId'))
  const [configValidation, setConfigValidation] = useState<RestaurantConfigValidation | null>(
    localStorage.get('restaurantConfigValidation')
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRestaurant = useCallback(async () => {
    if (!restaurantId) {
      setRestaurant(null)
      setConfigValidation(null)
      localStorage.remove('restaurant')
      localStorage.remove('restaurantConfigValidation')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const restaurant = await getRestaurantUsecase.execute({ restaurantId })
      const validation = validateRestaurantConfig(restaurant)
      setRestaurant(restaurant)
      setConfigValidation(validation)
      localStorage.set('restaurant', restaurant)
      localStorage.set('operationId', restaurant.id)
      localStorage.set('restaurantConfigValidation', validation)
      if (!validation.isReadyForOperation) {
        const missingConfigs = validation.missingConfigs.join(', ')
        toast.error(`Restaurante não está completo. Faltam: ${missingConfigs}`, {
          id: 'restaurant-incomplete-warning',
          duration: 5000
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar restaurante'
      setError(errorMessage)
      toast.error(errorMessage)
      localStorage.remove('restaurant')
      localStorage.remove('restaurantConfigValidation')
      setRestaurant(null)
      setConfigValidation(null)
    } finally {
      setIsLoading(false)
    }
  }, [restaurantId, localStorage, getRestaurantUsecase])

  const updateRestaurant = useCallback(
    (updates: Partial<Restaurant>) => {
      if (!restaurant) return
      const updatedRestaurant = { ...restaurant, ...updates }
      setRestaurant(updatedRestaurant)
      localStorage.set('restaurant', updatedRestaurant)
      const newConfigValidation = validateRestaurantConfig(updatedRestaurant)
      setConfigValidation(newConfigValidation)
      localStorage.set('restaurantConfigValidation', newConfigValidation)
    },
    [restaurant, localStorage]
  )

  const clearRestaurant = useCallback(() => {
    setRestaurant(null)
    setConfigValidation(null)
    setError(null)
    localStorage.remove('restaurant')
    localStorage.remove('restaurantConfigValidation')
  }, [localStorage])

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId])

  const contextValue = {
    restaurant,
    configValidation,
    isLoading,
    error,
    setRestaurant,
    updateRestaurant,
    clearRestaurant,
    refreshRestaurant: fetchRestaurant,
    operationId,
    setOperationId
  }

  return <RestaurantContext.Provider value={contextValue}>{children}</RestaurantContext.Provider>
}
