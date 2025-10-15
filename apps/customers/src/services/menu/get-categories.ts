import { api } from '@/lib/api'
import type { Category } from '@/types/category'

export interface GetRestaurantMenuCategoriesParams {
  restaurantId: string
  categoryIds?: string[]
}

export const getRestaurantMenuCategories = async ({
  restaurantId,
  categoryIds
}: GetRestaurantMenuCategoriesParams): Promise<Category[]> => {
  const body = categoryIds && categoryIds.length > 0 ? { categoryIds } : {}
  const response = await api.post<Category[]>(`/menu/restaurant/${restaurantId}/categories`, body)
  return response.data
}
