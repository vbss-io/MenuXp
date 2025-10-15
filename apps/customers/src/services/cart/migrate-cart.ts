import { api } from '@/lib/api'
import type { Cart } from '@/types/cart'

export interface MigrateCartParams {
  sessionId: string
  clientId: string
  restaurantId: string
}

export const migrateCart = async (data: MigrateCartParams): Promise<Cart> => {
  const response = await api.post<Cart>('/cart/migrate', data)
  return response.data
}
