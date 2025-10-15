import { api } from '@/lib/api'
import type { ComboWithCategoryName } from '@/types/combo'

export interface GetRestaurantMenuComboParams {
  restaurantId: string
  comboId: string
}

export const getRestaurantMenuCombo = async ({
  restaurantId,
  comboId
}: GetRestaurantMenuComboParams): Promise<ComboWithCategoryName> => {
  const response = await api.get<ComboWithCategoryName>(`/menu/restaurant/${restaurantId}/combo/${comboId}`)
  return response.data
}
