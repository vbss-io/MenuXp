import { useState } from 'react'
import { AddressStep } from '@/components/order/checkout-slide-view/address-step'
import type { Address } from '@/types/address'
import type { Client } from '@/types/client'

import * as S from '../../styles'

export const AddressStepShowcase = () => {
  const [useClientAddress1, setUseClientAddress1] = useState(true)
  const [useClientAddress2, setUseClientAddress2] = useState(false)
  const [useClientAddress3, setUseClientAddress3] = useState(false)
  const [customAddress1, setCustomAddress1] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [customAddress2, setCustomAddress2] = useState<Address>({
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  })
  const [customAddress3, setCustomAddress3] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const mockClientWithAddress: Client = {
    id: '1',
    restaurantId: 'rest-001',
    name: 'João Silva',
    phone: '11987654321',
    address: {
      street: 'Av. Paulista',
      number: '1000',
      complement: 'Sala 101',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-11-01T15:30:00Z')
  }

  const mockClientNoAddress: Client = {
    id: '2',
    restaurantId: 'rest-001',
    name: 'Maria Santos',
    phone: '11976543210',
    createdAt: new Date('2024-10-01T14:20:00Z'),
    updatedAt: new Date('2024-11-01T16:00:00Z')
  }

  const mockScenarios = [
    {
      id: 'logged-with-address-selected',
      label: 'Cliente logado com endereço cadastrado (selecionado)',
      client: mockClientWithAddress,
      useClientAddress: useClientAddress1,
      customAddress: customAddress1,
      onUseClientAddressChange: setUseClientAddress1,
      onCustomAddressChange: setCustomAddress1
    },
    {
      id: 'logged-with-address-new',
      label: 'Cliente logado com endereço cadastrado (novo endereço)',
      client: mockClientWithAddress,
      useClientAddress: useClientAddress2,
      customAddress: customAddress2,
      onUseClientAddressChange: setUseClientAddress2,
      onCustomAddressChange: setCustomAddress2
    },
    {
      id: 'logged-no-address',
      label: 'Cliente logado sem endereço cadastrado',
      client: mockClientNoAddress,
      useClientAddress: useClientAddress3,
      customAddress: customAddress3,
      onUseClientAddressChange: setUseClientAddress3,
      onCustomAddressChange: setCustomAddress3
    },
    {
      id: 'guest',
      label: 'Cliente visitante (não logado)',
      client: null,
      useClientAddress: false,
      customAddress: {
        street: 'Rua Nova',
        number: '456',
        complement: '',
        neighborhood: 'Jardins',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      onUseClientAddressChange: () => {},
      onCustomAddressChange: () => {}
    }
  ]

  return (
    <S.ShowcaseContainer>
      <S.Label>Address Step Component - Multiple Scenarios</S.Label>
      <S.ShowcaseGrid>
        {mockScenarios.map((scenario) => (
          <S.ShowcaseCard key={scenario.id}>
            <S.ShowcaseCardTitle>{scenario.label}</S.ShowcaseCardTitle>
            <AddressStep
              client={scenario.client}
              useClientAddress={scenario.useClientAddress}
              customAddress={scenario.customAddress}
              onUseClientAddressChange={scenario.onUseClientAddressChange}
              onCustomAddressChange={scenario.onCustomAddressChange}
              onSaveAddressForFuture={async () => {
                console.log('Saving address for future...')
              }}
            />
          </S.ShowcaseCard>
        ))}
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
