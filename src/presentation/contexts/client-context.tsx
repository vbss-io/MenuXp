import { createContext } from 'react'
import type { Client } from '@/domain/models/client.model'

export interface ClientContextData {
  client: Client | null
  isLoading: boolean
  error: string | null
  setClient: (client: Client) => void
  clearClient: () => void
  updateClient: (updates: Partial<Client>) => void
}

export const ClientContext = createContext<ClientContextData>({} as ClientContextData)
