import {
  BowlFoodIcon,
  ChatCenteredDotsIcon,
  GameControllerIcon,
  GraphIcon,
  HouseIcon,
  ListIcon,
  ScrollIcon,
  ShoppingCartIcon,
  SignOutIcon,
  UserIcon,
  XIcon
} from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import { Avatar } from '@/presentation/components/entities/users/avatar'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface MobileHeaderProps {
  setShowMobile: (show: boolean) => void
}

const mobileVariants = {
  initial: {
    x: '100%',
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      mass: 1
    }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      mass: 1
    }
  }
}

const logoVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      mass: 1
    }
  }
}

export const MobileHeader = ({ setShowMobile }: MobileHeaderProps) => {
  const { user, logout } = useAuth()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const goTo = (path: string) => {
    window.location.assign(path)
  }

  const menuItems = [
    { icon: <HouseIcon size={24} weight="fill" />, label: 'Operação', path: '/dashboard' },
    { icon: <ShoppingCartIcon size={24} weight="fill" />, label: 'Pedidos', path: '/dashboard/orders' },
    { icon: <ListIcon size={24} weight="fill" />, label: 'Categorias', path: '/dashboard/categories' },
    { icon: <BowlFoodIcon size={24} weight="fill" />, label: 'Items do Menu', path: '/dashboard/menu-items' },
    { icon: <ScrollIcon size={24} weight="fill" />, label: 'Cardápio', path: '/dashboard/menu' },
    { icon: <GraphIcon size={24} weight="fill" />, label: 'Relatórios', path: '/dashboard/reports' },
    { icon: <GameControllerIcon size={24} weight="fill" />, label: 'Missões', path: '/dashboard/missions' },
    { icon: <ChatCenteredDotsIcon size={24} weight="fill" />, label: 'Mensagens', path: '/dashboard/messages' }
  ]

  return (
    <AnimatePresence>
      <S.MobileContainer variants={mobileVariants} initial="initial" animate="animate" exit="exit">
        <Button className="close-menu" size="icon-xs" onClick={() => setShowMobile(false)}>
          <XIcon />
        </Button>
        <S.MobileContent>
          <motion.div variants={logoVariants} initial="initial" whileHover="hover">
            <S.Logo onClick={() => window.location.assign('/')}>
              <img src="https://placehold.co/120x40?text=Logo" alt="Logo Placeholder" />
            </S.Logo>
          </motion.div>
          {!user ? (
            <S.MobileButtonsContainer>
              <Button onClick={() => goTo('/login')}>Entrar</Button>
              <Button onClick={() => goTo('/register')}>Cadastrar</Button>
            </S.MobileButtonsContainer>
          ) : (
            <S.UserActions>
              <Avatar avatarSize={72} direction="column" showName />
              {menuItems.map((item, index) => (
                <S.MenuItem
                  key={index}
                  as={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goTo(item.path)}
                  $isActive={window.location.pathname === item.path}
                >
                  <S.IconWrapper>{item.icon}</S.IconWrapper>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                </S.MenuItem>
              ))}
              <S.MenuItem
                as={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goTo('/dashboard/profile')}
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
              <S.LogoutButton as={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={logout}>
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
          )}
        </S.MobileContent>
      </S.MobileContainer>
    </AnimatePresence>
  )
}
