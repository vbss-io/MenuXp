import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import toast from 'react-hot-toast'

import { ClientContext } from '@/hooks/contexts/client-context'
import { getSessionId } from '@/lib/utils/session'
import { migrateCart } from '@/services/cart/migrate-cart'
import { type CreateClientParams, createClient } from '@/services/client/create-client'
import { findClientByPhone } from '@/services/client/find-client-by-phone'
import { type UpdateClientParams, updateClient } from '@/services/client/update-client'
import type { Client } from '@/types/client'

interface UseClientReturn {
  client: Client | null
  error: string | null
  setClient: (client: Client) => void
  clearClient: () => void
  updateClient: (updates: Partial<Client>) => void
  loginClientMutation: ReturnType<typeof useMutation<unknown, Error, { phone: string; restaurantId: string }>>
  registerClientMutation: ReturnType<typeof useMutation<unknown, Error, CreateClientParams>>
  updateClientMutation: ReturnType<typeof useMutation<unknown, Error, { id: string } & UpdateClientParams>>
  loginClient: (phone: string, restaurantId: string) => Promise<{ success: boolean; isNewClient: boolean }>
  registerClient: (clientData: CreateClientParams) => Promise<{ success: boolean; isNewClient: boolean }>
  updateClientData: (id: string, updates: UpdateClientParams) => Promise<boolean>
}

export const useClient = (): UseClientReturn => {
  const context = useContext(ClientContext)
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider')
  }

  const loginClientMutation = useMutation({
    mutationFn: ({ phone, restaurantId }: { phone: string; restaurantId: string }) =>
      findClientByPhone({ restaurantId, phone }),
    onSuccess: (existingClient) => {
      if (existingClient) {
        toast.success('Login realizado com sucesso!')
      } else {
        toast.error('Cliente não encontrado. Faça o cadastro primeiro.')
      }
    },
    onError: () => {
      toast.error('Erro ao fazer login. Tente novamente.')
    }
  })

  const registerClientMutation = useMutation({
    mutationFn: (clientData: CreateClientParams) => createClient(clientData),
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao fazer cadastro. Tente novamente.')
    }
  })

  const updateClientMutation = useMutation({
    mutationFn: ({ id, ...updates }: { id: string } & UpdateClientParams) => updateClient({ id, ...updates }),
    onSuccess: () => {
      toast.success('Dados atualizados com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao atualizar dados. Tente novamente.')
    }
  })

  const loginClient = async (phone: string, restaurantId: string) => {
    const result = await loginClientMutation.mutateAsync({ phone, restaurantId })
    if (result) {
      context.setClient(result)
      try {
        const sessionId = getSessionId()
        await migrateCart({
          sessionId,
          clientId: result.id,
          restaurantId
        })
      } catch (error) {
        console.error('Error migrating cart:', error)
      }
    }
    return {
      success: !!result,
      isNewClient: false
    }
  }

  const registerClient = async (clientData: CreateClientParams) => {
    await registerClientMutation.mutateAsync(clientData)
    const newClient = await findClientByPhone({
      phone: clientData.phone,
      restaurantId: clientData.restaurantId
    })
    if (newClient) {
      context.setClient(newClient)
      try {
        const sessionId = getSessionId()
        await migrateCart({
          sessionId,
          clientId: newClient.id,
          restaurantId: clientData.restaurantId
        })
      } catch (error) {
        console.error('Error migrating cart:', error)
      }
    }
    return {
      success: true,
      isNewClient: true
    }
  }

  const updateClientData = async (id: string, updates: UpdateClientParams) => {
    try {
      await updateClientMutation.mutateAsync({ ...updates, id })
      if (context.client) {
        context.updateClient(updates)
      }
      return true
    } catch {
      return false
    }
  }

  return {
    client: context.client,
    error: context.error,
    setClient: context.setClient,
    clearClient: context.clearClient,
    updateClient: context.updateClient,
    loginClientMutation,
    registerClientMutation,
    updateClientMutation,
    loginClient,
    registerClient,
    updateClientData
  }
}
