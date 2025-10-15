import { api } from '@/lib/api'
import type { MenuItem } from '@/types/menu-item'

export interface GetRestaurantMenuItemsParams {
  restaurantId: string
  type: 'best_sellers' | 'discounts' | 'custom'
  menuItemIds?: string[]
}

export const getRestaurantMenuItems = async ({
  restaurantId,
  type,
  menuItemIds
}: GetRestaurantMenuItemsParams): Promise<MenuItem[]> => {
  const response = await api.post<MenuItem[]>(`/menu/restaurant/${restaurantId}/items`, {
    type,
    menuItemIds
  })
  return response.data
}
