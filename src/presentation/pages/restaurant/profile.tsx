import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { RestaurantHeader } from '@/presentation/components/entities/menu/restaurant-header'
import { MobileNavigation } from '@/presentation/components/entities/menu/mobile-navigation'
import { ClientLoginForm } from '@/presentation/components/entities/clients/client-login-form'
import { ClientRegisterForm } from '@/presentation/components/entities/clients/client-register-form'
import { ClientProfile } from '@/presentation/components/entities/clients/client-profile'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { useClient } from '@/presentation/hooks/use-client'

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`

const Content = styled.div`
  padding: 60px 20px 80px 20px;
  margin: 0 auto;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 0;

  &:hover {
    opacity: 0.8;
  }
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 400px;
  width: 100%;
`

export const RestaurantProfilePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { restaurant } = useRestaurant()
  const { client, clearClient } = useClient()
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  const handleLogout = () => {
    clearClient()
  }

  const handleModeChange = (mode: 'login' | 'register') => {
    setAuthMode(mode)
  }

  return (
    <Container>
      <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
      <Content>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon size={20} />
          Voltar ao menu
        </BackButton>

        <ProfileContainer>
          {client ? (
            <ClientProfile onLogout={handleLogout} />
          ) : (
            <>
              {authMode === 'login' ? (
                <ClientLoginForm onModeChange={handleModeChange} mode={authMode} />
              ) : (
                <ClientRegisterForm onModeChange={handleModeChange} mode={authMode} />
              )}
            </>
          )}
        </ProfileContainer>
      </Content>
      <MobileNavigation />
    </Container>
  )
}
