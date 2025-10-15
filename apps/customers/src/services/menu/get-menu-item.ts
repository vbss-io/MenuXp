import { api } from '@/lib/api'
import type { MenuItemWithCategoryName } from '@/types/menu-item'

export interface GetRestaurantMenuItemParams {
  restaurantId: string
  menuItemId: string
}

export const getRestaurantMenuItem = async ({
  restaurantId,
  menuItemId
}: GetRestaurantMenuItemParams): Promise<MenuItemWithCategoryName> => {
  const response = await api.get<MenuItemWithCategoryName>(`/menu/restaurant/${restaurantId}/item/${menuItemId}`)
  return response.data
}
