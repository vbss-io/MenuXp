import { api } from '@/lib/api'
import type { Combo } from '@/types/combo'

export interface GetRestaurantMenuCombosByCategoryParams {
  restaurantId: string
  categoryId: string
}

export const getRestaurantMenuCombosByCategory = async ({
  restaurantId,
  categoryId
}: GetRestaurantMenuCombosByCategoryParams): Promise<Combo[]> => {
  const response = await api.get<Combo[]>(`/menu/restaurant/${restaurantId}/category/${categoryId}/combos`)
  return response.data
}
