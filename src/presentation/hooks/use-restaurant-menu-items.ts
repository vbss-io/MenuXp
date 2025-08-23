import {
  GetRestaurantMenuItemsUsecase,
  type GetRestaurantMenuItemsUsecaseInput
} from '@/application/clients-menu/get-restaurant-menu-items.usecase'
import { useEffect, useState } from 'react'

interface UseRestaurantMenuItemsOptions {
  restaurantId: string
  menuItemIds?: string[]
  enabled?: boolean
}

interface UseRestaurantMenuItemsReturn {
  menuItems: Array<{
    id: string
    name: string
    description?: string
    categoryId: string
    price: number
    stock: number
    discount: number
    medias: string[]
    optionals: Array<{
      name: string
      maxQuantity?: number
      price: number
    }>
  }>
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useRestaurantMenuItems = ({
  restaurantId,
  menuItemIds,
  enabled = true
}: UseRestaurantMenuItemsOptions): UseRestaurantMenuItemsReturn => {
  const [menuItems, setMenuItems] = useState<
    Array<{
      id: string
      name: string
      description?: string
      categoryId: string
      price: number
      stock: number
      discount: number
      medias: string[]
      optionals: Array<{
        name: string
        maxQuantity?: number
        price: number
      }>
    }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMenuItems = async () => {
    if (!enabled || !restaurantId) return

    setIsLoading(true)
    setError(null)

    try {
      const usecase = new GetRestaurantMenuItemsUsecase()
      const params: GetRestaurantMenuItemsUsecaseInput = {
        restaurantId,
        ...(menuItemIds && menuItemIds.length > 0 && { menuItemIds })
      }

      const result = await usecase.execute(params)
      setMenuItems(result.menuItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar itens do menu')
      setMenuItems([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, menuItemIds?.join(','), enabled])

  return {
    menuItems,
    isLoading,
    error,
    refetch: fetchMenuItems
  }
}
