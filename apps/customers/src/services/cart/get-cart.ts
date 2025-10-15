import { api } from '@/lib/api'
import { getSessionId } from '@/lib/utils/session'
import type { Cart } from '@/types/cart'

export interface GetCartParams {
  clientId?: string
  restaurantId: string
}

export const getCart = async ({ clientId, restaurantId }: GetCartParams): Promise<Cart> => {
  const queryParams = new URLSearchParams()
  if (clientId) {
    queryParams.append('clientId', clientId)
  } else {
    const sessionId = getSessionId()
    queryParams.append('sessionId', sessionId)
  }
  const url = `/cart/restaurant/${restaurantId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
  const response = await api.get<Cart>(url)
  return response.data
}
