import { useState, useEffect } from 'react'
import {
  GetRestaurantMenuItemUsecase,
  type GetRestaurantMenuItemUsecaseInput
} from '@/application/clients-menu/get-restaurant-menu-item.usecase'

interface UseRestaurantMenuItemOptions {
  restaurantId: string
  menuItemId: string
  enabled?: boolean
}

interface UseRestaurantMenuItemReturn {
  menuItem: {
    id: string
    name: string
    description?: string
    categoryId: string
    categoryName: string
    price: number
    stock: number
    discount: number
    medias: string[]
    optionals: Array<{
      name: string
      maxQuantity?: number
      price: number
    }>
  } | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useRestaurantMenuItem = ({
  restaurantId,
  menuItemId,
  enabled = true
}: UseRestaurantMenuItemOptions): UseRestaurantMenuItemReturn => {
  const [menuItem, setMenuItem] = useState<UseRestaurantMenuItemReturn['menuItem']>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMenuItem = async () => {
    if (!enabled || !restaurantId || !menuItemId) return

    setIsLoading(true)
    setError(null)

    try {
      const usecase = new GetRestaurantMenuItemUsecase()
      const params: GetRestaurantMenuItemUsecaseInput = {
        restaurantId,
        menuItemId
      }

      const result = await usecase.execute(params)
      setMenuItem(result.menuItem)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar item do menu')
      setMenuItem(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, menuItemId, enabled])

  return {
    menuItem,
    isLoading,
    error,
    refetch: fetchMenuItem
  }
}
