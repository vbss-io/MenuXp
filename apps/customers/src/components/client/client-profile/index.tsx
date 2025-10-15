import { MapPinIcon, SignOutIcon, UserIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { ClientAddressSlide } from '@/components/client/client-address-slide'
import { ClientNameSlide } from '@/components/client/client-name-slide'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'

import * as S from './styles'

interface ClientProfileProps {
  onLogout: () => void
}

export const ClientProfile = ({ onLogout }: ClientProfileProps) => {
  const { client } = useClient()
  const { restaurant } = useRestaurant()
  const [isAddressSlideOpen, setIsAddressSlideOpen] = useState(false)
  const [isNameSlideOpen, setIsNameSlideOpen] = useState(false)

  const primaryColor = restaurant?.style?.primaryColor ?? '#3B82F6'

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
    <S.ProfileContainer>
      <S.ClientSummaryCard>
        <S.ClientInfo>
          <S.ClientAvatar primaryColor={primaryColor}>{getInitials(client.name)}</S.ClientAvatar>
          <S.ClientDetails>
            <S.ClientName>{client.name ?? 'Cliente'}</S.ClientName>
            <S.ClientPhone>{client.phone}</S.ClientPhone>
          </S.ClientDetails>
        </S.ClientInfo>
        <S.LogoutButton onClick={onLogout} primaryColor={primaryColor}>
          <SignOutIcon size={20} />
        </S.LogoutButton>
      </S.ClientSummaryCard>
      <S.CardsRow>
        <S.ActionCard onClick={handleAddressClick}>
          <S.CardHeader>
            <S.CardIcon primaryColor={primaryColor}>
              <MapPinIcon size={20} />
            </S.CardIcon>
            <S.CardTitle>Endereço</S.CardTitle>
          </S.CardHeader>
          <S.CardDescription>{client.address ? 'Endereço cadastrado' : 'Adicionar endereço'}</S.CardDescription>
        </S.ActionCard>
        <S.ActionCard onClick={handleNameClick}>
          <S.CardHeader>
            <S.CardIcon primaryColor={primaryColor}>
              <UserIcon size={20} />
            </S.CardIcon>
            <S.CardTitle>Nome</S.CardTitle>
          </S.CardHeader>
          <S.CardDescription>{client.name ? 'Editar nome' : 'Adicionar nome'}</S.CardDescription>
        </S.ActionCard>
      </S.CardsRow>
      <S.OrdersSection>
        <S.OrdersTitle>Pedidos</S.OrdersTitle>
        <S.EmptyOrdersCard>
          <S.EmptyOrdersText>Nenhum pedido encontrado</S.EmptyOrdersText>
        </S.EmptyOrdersCard>
      </S.OrdersSection>
      <ClientAddressSlide isOpen={isAddressSlideOpen} onClose={() => setIsAddressSlideOpen(false)} />
      <ClientNameSlide isOpen={isNameSlideOpen} onClose={() => setIsNameSlideOpen(false)} />
    </S.ProfileContainer>
  )
}
