import { ListIcon, ShoppingBagIcon, TicketIcon, UserIcon } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'

import { useLayout } from '@menuxp/ui'
import * as S from './styles'

export const MenuNavbar = () => {
  const { layout } = useLayout()
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

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

  const handleCouponsClick = () => {
    if (slug) {
      navigate(`/${slug}/coupons`)
    }
  }

  return (
    <S.NavigationContainer className={`navigation-container layout-${layout}`}>
      <S.NavigationList>
        <S.NavigationItem onClick={handleMenuClick} className={`navigation-item layout-${layout}`}>
          <S.IconWrapper className={`icon-wrapper layout-${layout}`}>
            <ListIcon size={24} weight="fill" />
          </S.IconWrapper>
        </S.NavigationItem>
        <S.NavigationItem onClick={handleCartClick} className={`navigation-item layout-${layout}`}>
          <S.IconWrapper className={`icon-wrapper layout-${layout}`}>
            <ShoppingBagIcon size={24} weight="fill" />
          </S.IconWrapper>
        </S.NavigationItem>
        <S.NavigationItem onClick={handleCouponsClick} className={`navigation-item layout-${layout}`}>
          <S.IconWrapper className={`icon-wrapper layout-${layout}`}>
            <TicketIcon size={24} weight="fill" />
          </S.IconWrapper>
        </S.NavigationItem>
        <S.NavigationItem onClick={handleProfileClick} className={`navigation-item layout-${layout}`}>
          <S.IconWrapper className={`icon-wrapper layout-${layout}`}>
            <UserIcon size={24} weight="fill" />
          </S.IconWrapper>
        </S.NavigationItem>
      </S.NavigationList>
    </S.NavigationContainer>
  )
}

MenuNavbar.displayName = 'MenuNavbar'
