import { api } from '@/lib/api'
import type { Combo } from '@/types/combo'
import type { MenuItem } from '@/types/menu-item'

export interface GetRestaurantMenuItemsByCategoryParams {
  restaurantId: string
  categoryId: string
}

export interface GetRestaurantMenuItemsByCategoryResponse {
  menuItems: MenuItem[]
  combos: Combo[]
}

export const getRestaurantMenuItemsByCategory = async ({
  restaurantId,
  categoryId
}: GetRestaurantMenuItemsByCategoryParams): Promise<GetRestaurantMenuItemsByCategoryResponse> => {
  const response = await api.get<GetRestaurantMenuItemsByCategoryResponse>(
    `/menu/restaurant/${restaurantId}/category/${categoryId}/items`
  )
  return response.data
}
