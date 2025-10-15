import { api } from '@/lib/api'
import type { Client } from '@/types/client'

export interface FindClientByPhoneParams {
  restaurantId: string
  phone: string
}

export const findClientByPhone = async ({ restaurantId, phone }: FindClientByPhoneParams): Promise<Client> => {
  const response = await api.get<Client>(`/clients/${restaurantId}/${phone}`)
  return response.data
}
