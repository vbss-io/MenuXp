import { api } from '@/lib/api'
import { getSessionId } from '@/lib/utils/session'
import type { Cart, CartItemOptional } from '@/types/cart'

export interface UpdateCartItemQuantityParams {
  clientId?: string
  restaurantId: string
  itemId: string
  quantity: number
  optionals?: CartItemOptional[]
  note: string
}

export const updateCartItemQuantity = async (data: UpdateCartItemQuantityParams): Promise<Cart> => {
  const payload = {
    ...data,
    sessionId: data.clientId ? undefined : getSessionId()
  }
  const response = await api.put<Cart>('/cart/update-quantity', payload)
  return response.data
}
