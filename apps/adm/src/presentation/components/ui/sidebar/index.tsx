import { useAuth } from '@/presentation/hooks/use-auth'
import { useSidebar } from '@/presentation/hooks/use-sidebar'
import {
  BowlFoodIcon,
  CaretLeftIcon,
  ChatCenteredDotsIcon,
  CreditCardIcon,
  GameControllerIcon,
  GearIcon,
  GraphIcon,
  HouseIcon,
  ScrollIcon,
  ShoppingCartIcon,
  SignOutIcon,
  TicketIcon
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import * as S from './styles'

interface MenuItem {
  icon: React.ReactNode
  label: string
  path: string
  badge?: number
  isActive?: boolean
}

export const Sidebar = () => {
  const { logout } = useAuth()
  const { isOpen, toggleSidebar } = useSidebar()
  const navigate = useNavigate()
  const location = useLocation()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const menuItems: MenuItem[] = [
    {
      icon: <HouseIcon size={20} weight="fill" />,
      label: 'Dashboard',
      path: '/dashboard',
      // badge: 5,
      isActive: location.pathname === '/dashboard'
    },
    {
      icon: <ShoppingCartIcon size={20} weight="fill" />,
      label: 'Pedidos',
      path: '/dashboard/orders',
      isActive: location.pathname === '/dashboard/orders'
    },
    {
      icon: <BowlFoodIcon size={20} weight="fill" />,
      label: 'Cardápio',
      path: '/dashboard/menu-items',
      isActive: location.pathname === '/dashboard/menu-items'
    },
    {
      icon: <ScrollIcon size={20} weight="fill" />,
      label: 'Aparência',
      path: '/dashboard/menu',
      isActive: location.pathname === '/dashboard/menu'
    },
    {
      icon: <TicketIcon size={20} weight="fill" />,
      label: 'Cupons',
      path: '/dashboard/coupons',
      isActive: location.pathname === '/dashboard/coupons'
    },
    {
      icon: <GraphIcon size={20} weight="fill" />,
      label: 'Relatórios',
      path: '/dashboard/reports',
      isActive: location.pathname === '/dashboard/reports'
    },
    {
      icon: <GameControllerIcon size={20} weight="fill" />,
      label: 'Missões',
      path: '/dashboard/missions',
      isActive: location.pathname === '/dashboard/missions'
    },
    {
      icon: <ChatCenteredDotsIcon size={20} weight="fill" />,
      label: 'Mensagens',
      path: '/dashboard/messages',
      isActive: location.pathname === '/dashboard/messages'
    },
    {
      icon: <CreditCardIcon size={20} weight="fill" />,
      label: 'Assinatura',
      path: '/dashboard/subscription',
      isActive: location.pathname === '/dashboard/subscription'
    },
    {
      icon: <GearIcon size={20} weight="fill" />,
      label: 'Configurações',
      path: '/dashboard/settings',
      isActive: location.pathname === '/dashboard/settings'
    }
  ]

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

  const handleLogoClick = () => {
    window.location.assign('/')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      toggleSidebar()
    }
  }

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault()
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [toggleSidebar])

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ width: 80 }}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        left: 0,
        zIndex: 10,
        overflow: 'hidden'
      }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <S.SidebarContainer className={!isOpen ? 'sidebar-closed' : ''} role="navigation" aria-label="Menu principal">
        <S.HeaderSection $isOpen={isOpen}>
          {isOpen && (
            <motion.div variants={logoVariants} initial="initial" whileHover="hover">
              <S.Logo
                onClick={handleLogoClick}
                $isOpen={isOpen}
                role="button"
                tabIndex={0}
                aria-label="Ir para página inicial"
                onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
              >
                <img
                  src="/images/menuxp-logo.svg"
                  alt="MenuXP - Seu estabelecimento merece um app próprio"
                  style={{ width: '120px', height: 'auto' }}
                />
              </S.Logo>
            </motion.div>
          )}
          <S.ToggleButton
            onClick={toggleSidebar}
            $isOpen={isOpen}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            title={`${isOpen ? 'Fechar' : 'Abrir'} menu (Ctrl+B)`}
          >
            <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <CaretLeftIcon size={20} weight="bold" />
            </motion.div>
          </S.ToggleButton>
        </S.HeaderSection>
        <S.MenuContainer>
          {menuItems.map((item, index) => (
            <S.MenuItem
              key={index}
              onClick={() => navigate(item.path)}
              $isActive={item.isActive}
              $isOpen={isOpen}
              role="menuitem"
              tabIndex={0}
              aria-label={item.label}
              title={!isOpen ? item.label : undefined}
            >
              <S.IconWrapper>{item.icon}</S.IconWrapper>
              {isOpen && (
                <>
                  <span>{item.label}</span>
                  {item.badge && <S.Badge>{item.badge}</S.Badge>}
                </>
              )}
            </S.MenuItem>
          ))}
        </S.MenuContainer>
        <S.BottomSection>
          <S.LogoutButton onClick={logout} $isOpen={isOpen} role="button" tabIndex={0} aria-label="Sair da conta">
            <S.IconWrapper>
              <SignOutIcon size={20} weight="fill" />
            </S.IconWrapper>
            {isOpen && <span>Sair</span>}
          </S.LogoutButton>
        </S.BottomSection>
      </S.SidebarContainer>
    </motion.div>
  )
}
