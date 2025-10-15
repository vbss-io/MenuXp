import { NotificationBell } from '@/components/notification/notification-bell/index.tsx'
import { LanguageSelector } from '@/components/ui/language-selector'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { useState } from 'react'

import * as S from './styles'

export const RestaurantHeader = () => {
  const { logo, name, layout } = useRestaurant()
  const { client } = useClient()
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const isValidImage = (url?: string) => {
    if (!url) return false
    return url.startsWith('http') || url.startsWith('data:image')
  }

  return (
    <S.HeaderContainer className={`header-container layout-${layout}`}>
      <S.LogoContainer className="logo-container">
        {logo && isValidImage(logo) && !imageError ? (
          <S.Logo src={logo} alt={`Logo ${name}`} onError={handleImageError} />
        ) : (
          <S.MenuXPLogo src="/images/menuxp-logo.png" alt="MenuXP Logo" />
        )}
      </S.LogoContainer>
      <S.ActionsContainer className="actions-container">
        {client && <NotificationBell />}
        <LanguageSelector />
      </S.ActionsContainer>
    </S.HeaderContainer>
  )
}
