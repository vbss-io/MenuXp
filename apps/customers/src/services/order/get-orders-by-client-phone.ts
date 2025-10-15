import { api } from '@/lib/api'
import type { Order } from '@/types/order'

export interface GetOrdersByClientPhoneParams {
  phone: string
  restaurantId: string
}

export interface GetOrdersByClientPhoneResponse {
  orders: Order[]
}

export const getOrdersByClientPhone = async ({
  phone,
  restaurantId
}: GetOrdersByClientPhoneParams): Promise<Order[]> => {
  const response = await api.get<GetOrdersByClientPhoneResponse>(`/orders/phone/${phone}/restaurant/${restaurantId}`)
  return response.data.orders
}
