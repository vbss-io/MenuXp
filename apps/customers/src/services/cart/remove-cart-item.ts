import { api } from '@/lib/api'
import { getSessionId } from '@/lib/utils/session'
import type { Cart, CartItemOptional } from '@/types/cart'

export interface RemoveItemFromCartParams {
  clientId?: string
  restaurantId: string
  itemId: string
  optionals?: CartItemOptional[]
  note: string
}

export const removeItemFromCart = async (data: RemoveItemFromCartParams): Promise<Cart> => {
  const payload = {
    ...data,
    sessionId: data.clientId ? undefined : getSessionId()
  }
  const response = await api.delete<Cart>('/cart/remove-item', { data: payload })
  return response.data
}
