import { api } from '@/lib/api'
import type { Order } from '@/types/order'

export interface GetOrdersByClientParams {
  clientId: string
  restaurantId: string
}

export interface GetOrdersByClientResponse {
  orders: Order[]
}

export const getOrdersByClient = async ({ clientId, restaurantId }: GetOrdersByClientParams): Promise<Order[]> => {
  const response = await api.get<GetOrdersByClientResponse>(`/orders/client/${clientId}/restaurant/${restaurantId}`)
  return response.data.orders
}
