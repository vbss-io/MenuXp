import { Button } from '@menuxp/ui'
import {
  BowlFoodIcon,
  ChatCenteredDotsIcon,
  CreditCardIcon,
  GameControllerIcon,
  GraphIcon,
  HouseIcon,
  ScrollIcon,
  ShoppingCartIcon,
  SignOutIcon,
  UserIcon,
  XIcon
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

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
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [])

  const goTo = (path: string) => {
    window.location.assign(path)
  }

  const menuItems = [
    { icon: <HouseIcon size={24} weight="fill" />, label: 'Operação', path: '/dashboard' },
    { icon: <ShoppingCartIcon size={24} weight="fill" />, label: 'Pedidos', path: '/dashboard/orders' },
    { icon: <BowlFoodIcon size={24} weight="fill" />, label: 'Cardápio', path: '/dashboard/menu-items' },
    { icon: <ScrollIcon size={24} weight="fill" />, label: 'Aparência', path: '/dashboard/menu' },
    { icon: <GraphIcon size={24} weight="fill" />, label: 'Relatórios', path: '/dashboard/reports' },
    { icon: <GameControllerIcon size={24} weight="fill" />, label: 'Missões', path: '/dashboard/missions' },
    { icon: <ChatCenteredDotsIcon size={24} weight="fill" />, label: 'Mensagens', path: '/dashboard/messages' },
    { icon: <CreditCardIcon size={24} weight="fill" />, label: 'Assinatura', path: '/dashboard/subscription' }
  ]

  return (
    <AnimatePresence>
      <S.MobileContainer variants={mobileVariants} initial="initial" animate="animate" exit="exit">
        <S.CloseButton onClick={() => setShowMobile(false)}>
          <XIcon size={24} weight="bold" />
        </S.CloseButton>
        <S.MobileContent className="mobile-header-content">
          <S.MobileHeaderSection>
            <motion.div variants={logoVariants} initial="initial" whileHover="hover">
              <S.MobileLogo onClick={() => window.location.assign('/')}>
                <img src="/images/menuxp-logo.svg" alt="MenuXP" />
              </S.MobileLogo>
            </motion.div>
          </S.MobileHeaderSection>
          {!user ? (
            <S.MobileButtonsContainer>
              <Button onClick={() => goTo('/login')} variant="white" size="md">
                Entrar
              </Button>
              <Button onClick={() => goTo('/register')} variant="primary" size="md">
                Cadastrar
              </Button>
            </S.MobileButtonsContainer>
          ) : (
            <S.MobileMenuItems>
              {menuItems.map((item, index) => (
                <S.MobileMenuItem
                  key={index}
                  onClick={() => goTo(item.path)}
                  $isActive={window.location.pathname === item.path}
                >
                  <S.MobileIconWrapper>{item.icon}</S.MobileIconWrapper>
                  <span>{item.label}</span>
                </S.MobileMenuItem>
              ))}
              <S.MobileMenuItem
                onClick={() => goTo('/dashboard/profile')}
                $isActive={window.location.pathname === '/dashboard/profile'}
              >
                <S.MobileIconWrapper>
                  <UserIcon size={24} weight="fill" />
                </S.MobileIconWrapper>
                <span>Perfil</span>
              </S.MobileMenuItem>
              <S.MobileLogoutButton onClick={logout}>
                <S.MobileIconWrapper>
                  <SignOutIcon size={20} weight="fill" />
                </S.MobileIconWrapper>
                <span>Sair</span>
              </S.MobileLogoutButton>
            </S.MobileMenuItems>
          )}
        </S.MobileContent>
      </S.MobileContainer>
    </AnimatePresence>
  )
}
