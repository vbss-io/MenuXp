import { api } from '@/lib/api'
import type { Client } from '@/types/client'

export interface CreateClientParams {
  name?: string
  phone: string
  restaurantId: string
}

export const createClient = async (data: CreateClientParams): Promise<Client> => {
  const response = await api.post<Client>('/clients', data)
  return response.data
}
