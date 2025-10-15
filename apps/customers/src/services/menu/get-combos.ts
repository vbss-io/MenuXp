import { api } from '@/lib/api'
import type { Combo } from '@/types/combo'

export interface GetRestaurantMenuCombosParams {
  restaurantId: string
  type: 'best_sellers' | 'discounts' | 'custom'
  comboIds?: string[]
}

export const getRestaurantMenuCombos = async ({
  restaurantId,
  type,
  comboIds
}: GetRestaurantMenuCombosParams): Promise<Combo[]> => {
  const response = await api.post<Combo[]>(`/menu/restaurant/${restaurantId}/combos`, {
    type,
    comboIds
  })
  return response.data
}
