import { api } from '@/lib/api'
import type { Address } from '@/types/address'
import type { Client } from '@/types/client'

export interface UpdateClientParams {
  id: string
  phone: string
  name?: string
  address?: Address
  preferredLanguage?: string
}

export const updateClient = async ({ id, ...updates }: UpdateClientParams): Promise<Client> => {
  const response = await api.put<Client>(`/clients/${id}`, updates)
  return response.data
}
