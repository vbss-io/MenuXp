import { useLayout } from '@menuxp/ui'
import { MapPinIcon, SignOutIcon, UserIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslator } from 'vbss-translator'

import { ClientAddressSlide } from '@/components/client/client-address-slide'
import { ClientNameSlide } from '@/components/client/client-name-slide'
import { useClient } from '@/hooks/use-client'

import * as S from './styles'

interface ClientProfileProps {
  onLogout: () => void
}

export const ClientProfile = ({ onLogout }: ClientProfileProps) => {
  const { t } = useTranslator()
  const { client } = useClient()
  const { layout } = useLayout()
  const [isAddressSlideOpen, setIsAddressSlideOpen] = useState(false)
  const [isNameSlideOpen, setIsNameSlideOpen] = useState(false)

  if (!client) return null

  const getInitials = (name?: string) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleAddressClick = () => {
    setIsAddressSlideOpen(true)
  }

  const handleNameClick = () => {
    setIsNameSlideOpen(true)
  }

  return (
    <S.ProfileContainer className={`client-profile layout-${layout}`}>
      <S.ClientSummaryCard className="client-summary-card">
        <S.ClientInfo className="client-info">
          <S.ClientAvatar className="client-avatar">{getInitials(client.name)}</S.ClientAvatar>
          <S.ClientDetails className="client-details">
            <S.ClientName className="client-name">{client.name ?? t('Cliente')}</S.ClientName>
            <S.ClientPhone className="client-phone">{client.phone}</S.ClientPhone>
          </S.ClientDetails>
        </S.ClientInfo>
        <S.LogoutButton onClick={onLogout} className="logout-button">
          <SignOutIcon size={20} />
        </S.LogoutButton>
      </S.ClientSummaryCard>
      <S.CardsRow className="cards-row">
        <S.ActionCard onClick={handleAddressClick} className="action-card">
          <S.CardHeader className="card-header">
            <S.CardIcon className="card-icon">
              <MapPinIcon size={20} />
            </S.CardIcon>
            <S.CardTitle className="card-title">{t('Endereço')}</S.CardTitle>
          </S.CardHeader>
          <S.CardDescription className="card-description">
            {client.address ? t('Endereço cadastrado') : t('Adicionar endereço')}
          </S.CardDescription>
        </S.ActionCard>
        <S.ActionCard onClick={handleNameClick} className="action-card">
          <S.CardHeader className="card-header">
            <S.CardIcon className="card-icon">
              <UserIcon size={20} />
            </S.CardIcon>
            <S.CardTitle className="card-title">{t('Nome')}</S.CardTitle>
          </S.CardHeader>
          <S.CardDescription className="card-description">
            {client.name ? t('Editar nome') : t('Adicionar nome')}
          </S.CardDescription>
        </S.ActionCard>
      </S.CardsRow>
      <ClientAddressSlide isOpen={isAddressSlideOpen} onClose={() => setIsAddressSlideOpen(false)} />
      <ClientNameSlide isOpen={isNameSlideOpen} onClose={() => setIsNameSlideOpen(false)} />
    </S.ProfileContainer>
  )
}
