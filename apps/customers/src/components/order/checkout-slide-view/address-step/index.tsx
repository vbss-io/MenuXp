import { useTranslator } from 'vbss-translator'

import { ClientAddressForm } from '@/components/client/client-address-form'
import type { Address } from '@/types/address'
import type { Client } from '@/types/client'
import { useLayout } from '@menuxp/ui'

import * as S from './styles'

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
  const { t } = useTranslator()
  const { layout } = useLayout()
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
      return (
        <S.FormContainer className="form-container">
          <ClientAddressForm initialData={customAddress} onChange={onCustomAddressChange} controlled />
        </S.FormContainer>
      )
    }
    if (hasExistingAddress && useClientAddress) {
      return (
        <S.AddressCardsContainer className="address-cards-container">
          <S.AddressCard className="address-card selected">
            <S.AddressCardTitle className="address-card-title">{t('Endereço cadastrado')}</S.AddressCardTitle>
            <S.AddressCardText className="address-card-text">
              {client!.address!.street}, {client!.address!.number}
              {client!.address!.complement && ` - ${client!.address!.complement}`}
              <br />
              {client!.address!.neighborhood} - {client!.address!.city}/{client!.address!.state}
            </S.AddressCardText>
          </S.AddressCard>
          <S.AddressCard className="address-card not-selected" onClick={() => onUseClientAddressChange(false)}>
            <S.AddressCardTitle className="address-card-title">{t('Usar outro endereço')}</S.AddressCardTitle>
            <S.AddressCardText className="address-card-text">
              {t('Clique para inserir um endereço diferente')}
            </S.AddressCardText>
          </S.AddressCard>
        </S.AddressCardsContainer>
      )
    }

    return (
      <S.AddressCardsContainer className="address-cards-container">
        {hasExistingAddress && (
          <S.AddressCard className="address-card not-selected" onClick={() => onUseClientAddressChange(true)}>
            <S.AddressCardTitle className="address-card-title">{t('Usar endereço cadastrado')}</S.AddressCardTitle>
            <S.AddressCardText className="address-card-text">
              {client!.address!.street}, {client!.address!.number}
              {client!.address!.complement && ` - ${client!.address!.complement}`}
              <br />
              {client!.address!.neighborhood} - {client!.address!.city}/{client!.address!.state}
            </S.AddressCardText>
          </S.AddressCard>
        )}
        <S.AddressCard className="address-card selected">
          <S.AddressCardTitle className="address-card-title">{t('Novo endereço')}</S.AddressCardTitle>
          <S.FormContainer className="form-container">
            <ClientAddressForm
              initialData={customAddress}
              onChange={onCustomAddressChange}
              showSaveOption={!!onSaveAddressForFuture}
              onSaveForFuture={onSaveAddressForFuture}
              controlled
            />
          </S.FormContainer>
        </S.AddressCard>
      </S.AddressCardsContainer>
    )
  }

  return (
    <S.AddressStep className={`address-step layout-${layout}`}>
      <S.SectionTitle className="section-title">{t('Endereço de Entrega')}</S.SectionTitle>
      {renderScenario()}
    </S.AddressStep>
  )
}
