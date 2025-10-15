import { ClientAddressForm } from '@/components/client/client-address-form'
import type { Address } from '@/types/address'
import type { Client } from '@/types/client'

import * as S from '../styles'

interface AddressStepProps {
  client: Client | null
  useClientAddress: boolean
  customAddress: Address
  onUseClientAddressChange: (value: boolean) => void
  onCustomAddressChange: (address: Address) => void
  onSaveAddressForFuture?: () => Promise<void>
}

export const AddressStep = ({
  client,
  useClientAddress,
  customAddress,
  onUseClientAddressChange,
  onCustomAddressChange,
  onSaveAddressForFuture
}: AddressStepProps) => {
  const isLoggedIn = !!client
  const hasExistingAddress = !!(
    client?.address?.street &&
    client?.address?.number &&
    client?.address?.neighborhood &&
    client?.address?.city &&
    client?.address?.state
  )

  const renderScenario = () => {
    if (!isLoggedIn) {
      return <ClientAddressForm initialData={customAddress} onChange={onCustomAddressChange} controlled />
    }
    if (hasExistingAddress && useClientAddress) {
      return (
        <>
          <S.AddressCard selected={true}>
            <S.AddressTitle>Endereço cadastrado</S.AddressTitle>
            <S.AddressText>
              {client!.address!.street}, {client!.address!.number}
              {client!.address!.complement && ` - ${client!.address!.complement}`}
              <br />
              {client!.address!.neighborhood} - {client!.address!.city}/{client!.address!.state}
            </S.AddressText>
          </S.AddressCard>
          <S.AddressCard selected={false} onClick={() => onUseClientAddressChange(false)}>
            <S.AddressTitle>Usar outro endereço</S.AddressTitle>
            <S.AddressText>Clique para inserir um endereço diferente</S.AddressText>
          </S.AddressCard>
        </>
      )
    }

    return (
      <>
        {hasExistingAddress && (
          <S.AddressCard selected={false} onClick={() => onUseClientAddressChange(true)}>
            <S.AddressTitle>Usar endereço cadastrado</S.AddressTitle>
            <S.AddressText>
              {client!.address!.street}, {client!.address!.number}
              {client!.address!.complement && ` - ${client!.address!.complement}`}
              <br />
              {client!.address!.neighborhood} - {client!.address!.city}/{client!.address!.state}
            </S.AddressText>
          </S.AddressCard>
        )}
        <S.AddressCard selected={true}>
          <S.AddressTitle>Novo endereço</S.AddressTitle>
          <div style={{ marginTop: '1rem' }}>
            <ClientAddressForm
              initialData={customAddress}
              onChange={onCustomAddressChange}
              showSaveOption={!!onSaveAddressForFuture}
              onSaveForFuture={onSaveAddressForFuture}
              controlled
            />
          </div>
        </S.AddressCard>
      </>
    )
  }

  return (
    <S.AddressSection>
      <h3>Endereço de Entrega</h3>
      {renderScenario()}
    </S.AddressSection>
  )
}
