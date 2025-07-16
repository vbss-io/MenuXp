import { ChartPieIcon, ListIcon, SignOutIcon, UserIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Popover } from '@vbss-ui/popover'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { Avatar } from '@/presentation/components/entities/users/avatar'
import { MobileHeader } from '@/presentation/components/ui/header/mobile'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const logoVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 17
    }
  }
}

export const Header = () => {
  const { user, logout } = useAuth()
  const [showMobile, setShowMobile] = useState(false)

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <motion.div variants={logoVariants} initial="initial" whileHover="hover">
          <S.Logo onClick={() => window.location.assign('/')}>
            <img src="https://placehold.co/120x40?text=Logo" alt="Logo Placeholder" />
          </S.Logo>
        </motion.div>
        <S.RightSection>
          <Button className="menu" size="icon-xs" onClick={() => setShowMobile(!showMobile)}>
            <ListIcon />
          </Button>
          {!user ? (
            <S.ButtonsContainer>
              <Button size="sm" as="a" href="/login">
                Entrar
              </Button>
              <Button size="sm" as="a" href="/register" variant="outline">
                Cadastrar
              </Button>
            </S.ButtonsContainer>
          ) : (
            <Popover
              rounded="lg"
              variant="primary"
              trigger={<Avatar showName />}
              side="bottom"
              align="start"
              style={{ zIndex: 99999 }}
              sideOffset={10}
            >
              <S.UserActions>
                <S.UserInfo>
                  <div>{user?.name ?? user.username}</div>
                  <S.UserEmail>{user.email}</S.UserEmail>
                </S.UserInfo>
                <S.MenuItem
                  as={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.assign('/dashboard')}
                  $isActive={window.location.pathname === '/dashboard'}
                >
                  <S.IconWrapper>
                    <ChartPieIcon size={24} weight="fill" />
                  </S.IconWrapper>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    Painel
                  </motion.span>
                </S.MenuItem>
                <S.MenuItem
                  as={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.assign('/dashboard/profile')}
                  $isActive={window.location.pathname === '/dashboard/profile'}
                >
                  <S.IconWrapper>
                    <UserIcon size={24} weight="fill" />
                  </S.IconWrapper>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    Perfil
                  </motion.span>
                </S.MenuItem>
                <S.LogoutButton
                  as={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                >
                  <S.IconWrapper>
                    <SignOutIcon size={24} weight="fill" />
                  </S.IconWrapper>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    Sair
                  </motion.span>
                </S.LogoutButton>
              </S.UserActions>
            </Popover>
          )}
        </S.RightSection>
      </S.HeaderContent>
      {showMobile && <MobileHeader setShowMobile={setShowMobile} />}
    </S.HeaderContainer>
  )
}
