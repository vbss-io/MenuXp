import { api } from '@/lib/api'
import { getSessionId } from '@/lib/utils/session'

export interface ClearCartParams {
  clientId?: string
  restaurantId: string
}

export const clearCart = async ({ clientId, restaurantId }: ClearCartParams): Promise<void> => {
  const queryParams = new URLSearchParams()
  if (clientId) {
    queryParams.append('clientId', clientId)
  } else {
    const sessionId = getSessionId()
    queryParams.append('sessionId', sessionId)
  }
  const url = `/cart/clear/restaurant/${restaurantId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
  await api.delete(url)
}
