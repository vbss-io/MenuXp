import { useCallback, useMemo, useState } from 'react'
import type { Client } from '@/domain/models/client.model'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'
import { ClientContext } from '@/presentation/contexts/client-context'

interface ClientProviderProps {
  children: React.ReactNode
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  const [client, setClientState] = useState<Client | null>(localStorage.get('client'))
  const [error, setError] = useState<string | null>(null)

  const setClient = useCallback(
    (newClient: Client) => {
      setClientState(newClient)
      localStorage.set('client', newClient)
      setError(null)
    },
    [localStorage]
  )

  const clearClient = useCallback(() => {
    setClientState(null)
    localStorage.remove('client')
    setError(null)
  }, [localStorage])

  const updateClient = useCallback(
    (updates: Partial<Client>) => {
      if (!client) return
      const updatedClient = { ...client, ...updates }
      setClientState(updatedClient)
      localStorage.set('client', updatedClient)
    },
    [client, localStorage]
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
