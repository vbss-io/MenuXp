import { useCallback, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { CreateClientUsecase } from '@/application/clients/create-client.usecase'
import { FindClientByPhoneUsecase } from '@/application/clients/find-client-by-phone.usecase'
import { UpdateClientUsecase } from '@/application/clients/update-client.usecase'
import type { CreateClientInput, UpdateClientInput } from '@/domain/models/client.model'
import { ClientContext } from '@/presentation/contexts/client-context'

export const useClient = () => {
  const context = useContext(ClientContext)
  const [isLoading, setIsLoading] = useState(false)

  if (!context) {
    throw new Error('useClient must be used within a ClientProvider')
  }

  const { client, setClient, clearClient, updateClient } = context

  const loginClient = useCallback(
    async (phone: string, restaurantId: string) => {
      setIsLoading(true)
      try {
        const findClientUsecase = new FindClientByPhoneUsecase()
        const existingClient = await findClientUsecase.execute({ phone, restaurantId })

        if (existingClient) {
          setClient(existingClient)
          toast.success('Login realizado com sucesso!')
          return { success: true, isNewClient: false }
        } else {
          toast.error('Cliente não encontrado. Faça o cadastro primeiro.')
          return { success: false, isNewClient: false }
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        toast.error('Erro ao fazer login. Tente novamente.')
        return { success: false, isNewClient: false }
      } finally {
        setIsLoading(false)
      }
    },
    [setClient]
  )

  const registerClient = useCallback(
    async (clientData: CreateClientInput) => {
      setIsLoading(true)
      try {
        const createClientUsecase = new CreateClientUsecase()
        await createClientUsecase.execute(clientData)
        const findClientUsecase = new FindClientByPhoneUsecase()
        const newClient = await findClientUsecase.execute({
          phone: clientData.phone,
          restaurantId: clientData.restaurantId
        })
        if (newClient) {
          setClient(newClient)
          toast.success('Cadastro realizado com sucesso!')
          return { success: true, isNewClient: true }
        } else {
          toast.error('Erro ao recuperar dados do cliente.')
          return { success: false, isNewClient: true }
        }
      } catch (error) {
        console.error('Erro ao cadastrar cliente:', error)
        toast.error('Erro ao fazer cadastro. Tente novamente.')
        return { success: false, isNewClient: true }
      } finally {
        setIsLoading(false)
      }
    },
    [setClient]
  )

  const updateClientData = useCallback(
    async (updates: UpdateClientInput) => {
      if (!client?.id) {
        toast.error('Cliente não identificado.')
        return false
      }

      setIsLoading(true)
      try {
        const updateClientUsecase = new UpdateClientUsecase()
        const updatedClient = await updateClientUsecase.execute({
          id: client.id,
          ...updates
        })

        updateClient(updatedClient)
        toast.success('Dados atualizados com sucesso!')
        return true
      } catch (error) {
        console.error('Erro ao atualizar cliente:', error)
        toast.error('Erro ao atualizar dados. Tente novamente.')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [client?.id, updateClient]
  )

  return {
    client,
    isLoading,
    loginClient,
    registerClient,
    updateClientData,
    setClient,
    clearClient,
    updateClient
  }
}
