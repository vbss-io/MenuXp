import styled from 'styled-components'
import { List, ShoppingBag, GameController, Ticket, User } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  padding: 8px 0;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`

const NavigationList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavigationItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const IconWrapper = styled.div<{ isGames?: boolean; primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isGames }) => (isGames ? '48px' : '32px')};
  height: ${({ isGames }) => (isGames ? '48px' : '32px')};
  border-radius: ${({ isGames }) => (isGames ? '50%' : '8px')};
  background-color: ${({ isGames, primaryColor }) => (isGames ? primaryColor : 'transparent')};
  color: ${({ isGames, primaryColor }) => (isGames ? 'white' : primaryColor)};
  transition: all 0.2s ease;

  &:hover {
    transform: ${({ isGames }) => (isGames ? 'scale(1.1)' : 'scale(1.05)')};
  }
`

export const MobileNavigation = () => {
  const { restaurant } = useRestaurant()
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const primaryColor = restaurant?.style?.primaryColor || '#3B82F6'

  const handleMenuClick = () => {
    if (slug) {
      navigate(`/${slug}`)
    }
  }

  const handleProfileClick = () => {
    if (slug) {
      navigate(`/${slug}/profile`)
    }
  }

  const handleCartClick = () => {
    if (slug) {
      navigate(`/${slug}/cart`)
    }
  }

  return (
    <NavigationContainer>
      <NavigationList>
        <NavigationItem onClick={handleMenuClick}>
          <IconWrapper primaryColor={primaryColor}>
            <List size={24} weight="fill" />
          </IconWrapper>
        </NavigationItem>

        <NavigationItem onClick={handleCartClick}>
          <IconWrapper primaryColor={primaryColor}>
            <ShoppingBag size={24} weight="fill" />
          </IconWrapper>
        </NavigationItem>

        <NavigationItem>
          <IconWrapper isGames primaryColor={primaryColor}>
            <GameController size={28} weight="fill" />
          </IconWrapper>
        </NavigationItem>

        <NavigationItem>
          <IconWrapper primaryColor={primaryColor}>
            <Ticket size={24} weight="fill" />
          </IconWrapper>
        </NavigationItem>

        <NavigationItem onClick={handleProfileClick}>
          <IconWrapper primaryColor={primaryColor}>
            <User size={24} weight="fill" />
          </IconWrapper>
        </NavigationItem>
      </NavigationList>
    </NavigationContainer>
  )
}
