import styled from 'styled-components'

interface RestaurantHeaderProps {
  logo?: string
  restaurantName: string
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 100;
`

const Logo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`

const MenuXPLogo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`

export const RestaurantHeader = ({ logo, restaurantName }: RestaurantHeaderProps) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = 'none'
  }

  const isValidImage = (url?: string) => {
    if (!url) return false
    return url.startsWith('http') || url.startsWith('data:image')
  }

  return (
    <HeaderContainer>
      {logo && isValidImage(logo) ? (
        <Logo src={logo} alt={`Logo ${restaurantName}`} onError={handleImageError} />
      ) : (
        <MenuXPLogo src="/images/menuxp-logo.png" alt="MenuXP Logo" />
      )}
    </HeaderContainer>
  )
}
