import { useMemo } from 'react'

import { ClientProfile } from '@/components/client/client-profile'
import { ClientContext } from '@/hooks/contexts/client-context'
import type { Client } from '@/types/client'

import * as S from '../../styles'

const mockClients: Client[] = [
  {
    id: '1',
    phone: '(11) 98765-4321',
    restaurantId: 'restaurant-1',
    name: 'João Silva',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      complement: 'Apto 45'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    phone: '(21) 99876-5432',
    restaurantId: 'restaurant-1',
    name: 'Maria Santos',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    phone: '(31) 91234-5678',
    restaurantId: 'restaurant-1',
    name: 'Carlos Eduardo Oliveira',
    address: {
      street: 'Avenida Principal',
      number: '789',
      neighborhood: 'Jardins',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30123-456',
      complement: ''
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    phone: '(41) 98888-7777',
    restaurantId: 'restaurant-1',
    name: 'Ana',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    phone: '(51) 97777-6666',
    restaurantId: 'restaurant-1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    phone: '(61) 96666-5555',
    restaurantId: 'restaurant-1',
    name: 'Pedro Henrique Costa',
    address: {
      street: 'Quadra 10',
      number: '15',
      neighborhood: 'Asa Sul',
      city: 'Brasília',
      state: 'DF',
      zipCode: '70000-000',
      complement: 'Casa 2'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

interface MockClientProviderProps {
  client: Client
  children: React.ReactNode
}

const MockClientProvider: React.FC<MockClientProviderProps> = ({ client, children }) => {
  const value = useMemo(
    () => ({
      client,
      setClient: () => {},
      clearClient: () => {},
      updateClient: () => {},
      error: null
    }),
    [client]
  )

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
}

export const ClientProfileShowcase: React.FC = () => {
  const handleLogout = () => {
    console.log('Logout clicked')
  }

  return (
    <S.ShowcaseContainer>
      <S.Label>ClientProfile</S.Label>
      <S.ShowcaseGrid>
        {mockClients.map((client) => (
          <S.ShowcaseItem key={client.id}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>
                {client.name || 'Sem nome'} - {client.address ? 'Com endereço' : 'Sem endereço'}
              </h3>
              <MockClientProvider client={client}>
                <ClientProfile onLogout={handleLogout} />
              </MockClientProvider>
            </div>
          </S.ShowcaseItem>
        ))}
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
