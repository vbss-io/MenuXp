import { ChartPieIcon, SignOutIcon, UserIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import React from 'react'

import { Avatar } from '@/presentation/@to-do/components/entities/users/avatar'
import { Popover } from '@/presentation/components/ui/popover'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface UserMenuProps {
  trigger?: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
}

export const UserMenu: React.FC<UserMenuProps> = ({
  trigger,
  side = 'bottom',
  align = 'start',
  sideOffset = 10,
  alignOffset = 0
}) => {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="user-menu-trigger">
      <Avatar showName />
    </Button>
  )

  return (
    <Popover
      trigger={trigger || defaultTrigger}
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      variant="primary"
    >
      <S.UserMenuContainer>
        <S.HeaderSection>
          <S.UserInfo>
            <Avatar avatarSize={48} direction="row" showName />
            <S.UserEmail>{user.email}</S.UserEmail>
          </S.UserInfo>
        </S.HeaderSection>
        <S.MenuContainer>
          <S.MenuItem
            onClick={() => window.location.assign('/dashboard')}
            $isActive={window.location.pathname === '/dashboard'}
            $isOpen={true}
          >
            <S.IconWrapper>
              <ChartPieIcon size={24} weight="fill" />
            </S.IconWrapper>
            <span>Painel</span>
          </S.MenuItem>
          <S.MenuItem
            onClick={() => window.location.assign('/dashboard/profile')}
            $isActive={window.location.pathname === '/dashboard/profile'}
            $isOpen={true}
          >
            <S.IconWrapper>
              <UserIcon size={24} weight="fill" />
            </S.IconWrapper>
            <span>Perfil</span>
          </S.MenuItem>
        </S.MenuContainer>
        <S.BottomSection>
          <S.LogoutButton onClick={logout} $isOpen={true}>
            <S.IconWrapper>
              <SignOutIcon size={24} weight="fill" />
            </S.IconWrapper>
            <span>Sair</span>
          </S.LogoutButton>
        </S.BottomSection>
      </S.UserMenuContainer>
    </Popover>
  )
}

export default UserMenu
