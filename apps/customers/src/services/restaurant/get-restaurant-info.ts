import { api } from '@/lib/api'
import type { RestaurantWithInfo } from '@/types/restaurant'

export interface GetRestaurantInfoParams {
  slug: string
}

export const getRestaurantInfo = async ({ slug }: GetRestaurantInfoParams): Promise<RestaurantWithInfo> => {
  const response = await api.get<RestaurantWithInfo>(`/menu/restaurant/${slug}`)
  return response.data
}
