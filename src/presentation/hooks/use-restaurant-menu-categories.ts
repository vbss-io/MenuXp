import {
  GetRestaurantMenuCategoriesUsecase,
  type GetRestaurantMenuCategoriesUsecaseInput
} from '@/application/clients-menu/get-restaurant-menu-categories.usecase'
import { useEffect, useState } from 'react'

interface UseRestaurantMenuCategoriesOptions {
  restaurantId: string
  categoryIds?: string[]
  enabled?: boolean
}

interface UseRestaurantMenuCategoriesReturn {
  categories: Array<{
    id: string
    name: string
    description?: string
    icon?: string
  }>
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useRestaurantMenuCategories = ({
  restaurantId,
  categoryIds,
  enabled = true
}: UseRestaurantMenuCategoriesOptions): UseRestaurantMenuCategoriesReturn => {
  const [categories, setCategories] = useState<
    Array<{
      id: string
      name: string
      description?: string
      icon?: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    if (!enabled || !restaurantId) return

    setIsLoading(true)
    setError(null)

    try {
      const usecase = new GetRestaurantMenuCategoriesUsecase()
      const params: GetRestaurantMenuCategoriesUsecaseInput = {
        restaurantId,
        ...(categoryIds && categoryIds.length > 0 && { categoryIds })
      }

      const result = await usecase.execute(params)
      setCategories(result.categories)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar categorias')
      setCategories([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, categoryIds?.join(','), enabled])

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories
  }
}
