import { useCallback, useEffect, useMemo, useState } from 'react'

import { ClientContext } from '@/hooks/contexts/client-context'
import { storageUtils } from '@/lib/local-storage'
import type { Client } from '@/types/client'

interface ClientProviderProps {
  children: React.ReactNode
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [client, setClientState] = useState<Client | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedClient = storageUtils.client.get() as Client | null
    if (savedClient) {
      setClientState(savedClient)
    }
  }, [])

  const setClient = useCallback((newClient: Client) => {
    setClientState(newClient)
    storageUtils.client.set(newClient)
    setError(null)
  }, [])

  const clearClient = useCallback(() => {
    setClientState(null)
    storageUtils.client.remove()
    setError(null)
  }, [])

  const updateClient = useCallback(
    (updates: Partial<Client>) => {
      if (!client) return
      const updatedClient = { ...client, ...updates }
      setClientState(updatedClient)
      storageUtils.client.set(updatedClient)
    },
    [client]
  )

  const contextValue = useMemo(
    () => ({
      client,
      error,
      setClient,
      clearClient,
      updateClient
    }),
    [client, error, setClient, clearClient, updateClient]
  )

  return <ClientContext.Provider value={contextValue}>{children}</ClientContext.Provider>
}
