import { api } from '@/lib/api'
import type { Order } from '@/types/order'

export interface GetOrderBySlugAndCodeParams {
  restaurantSlug: string
  orderCode: string
}

export const getOrderBySlugAndCode = async ({
  restaurantSlug,
  orderCode
}: GetOrderBySlugAndCodeParams): Promise<Order> => {
  const response = await api.get<Order>(`/order/slug/${restaurantSlug}/code/${orderCode}`)
  return response.data
}
