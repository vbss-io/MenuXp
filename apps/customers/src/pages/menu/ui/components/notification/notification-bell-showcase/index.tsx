import React from 'react'

import { NotificationBell } from '@/components/notification/notification-bell'

import * as S from '../../styles'

export const NotificationBellShowcase: React.FC = () => {
  return (
    <S.ShowcaseContainer>
      <S.Label>NotificationBell - Component uses useNotifications hook for dynamic data</S.Label>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <NotificationBell />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <NotificationBell />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <NotificationBell />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <NotificationBell />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <NotificationBell />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <NotificationBell />
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
