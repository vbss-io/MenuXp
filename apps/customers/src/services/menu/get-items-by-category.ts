import { api } from '@/lib/api'
import type { Combo } from '@/types/combo'
import type { MenuItem } from '@/types/menu-item'

export interface GetItemsByCategoryParams {
  restaurantId: string
  categoryId: string
}

export interface GetItemsByCategoryResponse {
  menuItems: MenuItem[]
  combos: Combo[]
  total: number
}

export const getItemsByCategory = async ({
  restaurantId,
  categoryId
}: GetItemsByCategoryParams): Promise<GetItemsByCategoryResponse> => {
  const response = await api.get<GetItemsByCategoryResponse>(
    `/menu/restaurant/${restaurantId}/category/${categoryId}/all-items`
  )
  return response.data
}
