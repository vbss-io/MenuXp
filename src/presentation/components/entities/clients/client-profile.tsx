import { useState } from 'react'
import styled from 'styled-components'
import { UserIcon, SignOutIcon, MapPinIcon } from '@phosphor-icons/react'
import { useClient } from '@/presentation/hooks/use-client'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { ClientAddressSlide } from './client-address-slide'
import { ClientNameSlide } from './client-name-slide'

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
`

const ClientSummaryCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ClientAvatar = styled.div<{ primaryColor: string }>`
  width: 60px;
  height: 60px;
  background: ${({ primaryColor }) => primaryColor};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ClientName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const ClientPhone = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

const LogoutButton = styled.button<{ primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ primaryColor }) => primaryColor};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const CardsRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ActionCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const CardIcon = styled.div<{ primaryColor: string }>`
  width: 40px;
  height: 40px;
  background: ${({ primaryColor }) => primaryColor};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
`

const CardTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

const OrdersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OrdersTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const EmptyOrdersCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  text-align: center;
`

const EmptyOrdersText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

interface ClientProfileProps {
  onLogout: () => void
}

export const ClientProfile = ({ onLogout }: ClientProfileProps) => {
  const { client } = useClient()
  const { restaurant } = useRestaurant()
  const [isAddressSlideOpen, setIsAddressSlideOpen] = useState(false)
  const [isNameSlideOpen, setIsNameSlideOpen] = useState(false)

  const primaryColor = restaurant?.style?.primaryColor || '#3B82F6'

  if (!client) {
    return null
  }

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
    <ProfileContainer>
      <ClientSummaryCard>
        <ClientInfo>
          <ClientAvatar primaryColor={primaryColor}>{getInitials(client.name)}</ClientAvatar>
          <ClientDetails>
            <ClientName>{client.name || 'Cliente'}</ClientName>
            <ClientPhone>{client.phone}</ClientPhone>
          </ClientDetails>
        </ClientInfo>
        <LogoutButton onClick={onLogout} primaryColor={primaryColor}>
          <SignOutIcon size={20} />
        </LogoutButton>
      </ClientSummaryCard>
      <CardsRow>
        <ActionCard onClick={handleAddressClick}>
          <CardHeader>
            <CardIcon primaryColor={primaryColor}>
              <MapPinIcon size={20} />
            </CardIcon>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardDescription>{client.address ? 'Endereço cadastrado' : 'Adicionar endereço'}</CardDescription>
        </ActionCard>
        <ActionCard onClick={handleNameClick}>
          <CardHeader>
            <CardIcon primaryColor={primaryColor}>
              <UserIcon size={20} />
            </CardIcon>
            <CardTitle>Nome</CardTitle>
          </CardHeader>
          <CardDescription>{client.name ? 'Editar nome' : 'Adicionar nome'}</CardDescription>
        </ActionCard>
      </CardsRow>
      <OrdersSection>
        <OrdersTitle>Pedidos</OrdersTitle>
        <EmptyOrdersCard>
          <EmptyOrdersText>Nenhum pedido encontrado</EmptyOrdersText>
        </EmptyOrdersCard>
      </OrdersSection>
      <ClientAddressSlide isOpen={isAddressSlideOpen} onClose={() => setIsAddressSlideOpen(false)} />
      <ClientNameSlide isOpen={isNameSlideOpen} onClose={() => setIsNameSlideOpen(false)} />
    </ProfileContainer>
  )
}
