import { api } from '@/lib/api'
import { getSessionId } from '@/lib/utils/session'
import type { Cart, CartItemOptional } from '@/types/cart'

export interface AddItemToCartParams {
  clientId?: string
  restaurantId: string
  itemId: string
  quantity: number
  itemType: 'menu-item' | 'combo'
  optionals?: CartItemOptional[]
  note: string
}

export const addItemToCart = async (data: AddItemToCartParams): Promise<Cart> => {
  const payload = {
    ...data,
    sessionId: data.clientId ? undefined : getSessionId()
  }
  const response = await api.post<Cart>('/cart/add-item', payload)
  return response.data
}
