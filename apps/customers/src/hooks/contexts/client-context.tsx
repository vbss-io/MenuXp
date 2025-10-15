import { createContext } from 'react'

import type { Client } from '@/types/client'

export interface ClientContextData {
  client: Client | null
  error: string | null
  setClient: (client: Client) => void
  clearClient: () => void
  updateClient: (updates: Partial<Client>) => void
}

export const ClientContext = createContext<ClientContextData>({} as ClientContextData)
