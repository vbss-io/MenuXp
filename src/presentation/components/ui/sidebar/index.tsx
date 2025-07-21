import {
  BowlFoodIcon,
  CaretLeftIcon,
  ChatCenteredDotsIcon,
  GameControllerIcon,
  GraphIcon,
  HouseIcon,
  ShoppingCartIcon,
  SignOutIcon,
  GearIcon,
  ListIcon
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSidebar } from '@/presentation/hooks/use-sidebar'

import { useAuth } from '@/presentation/hooks/use-auth'
import * as S from './styles'

export const Sidebar = () => {
  const { logout } = useAuth()
  const { isOpen, toggleSidebar } = useSidebar()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: <HouseIcon size={24} weight="fill" />, label: 'Operação', path: '/dashboard' },
    { icon: <ShoppingCartIcon size={24} weight="fill" />, label: 'Pedidos', path: '/dashboard/orders' },
    { icon: <BowlFoodIcon size={24} weight="fill" />, label: 'Menu', path: '/dashboard/menu' },
    { icon: <ListIcon size={24} weight="fill" />, label: 'Categorias', path: '/dashboard/categories' },
    { icon: <GraphIcon size={24} weight="fill" />, label: 'Relatórios', path: '/dashboard/reports' },
    { icon: <GameControllerIcon size={24} weight="fill" />, label: 'Missões', path: '/dashboard/missions' },
    { icon: <ChatCenteredDotsIcon size={24} weight="fill" />, label: 'Mensagens', path: '/dashboard/messages' },
    { icon: <GearIcon size={24} weight="fill" />, label: 'Configurações', path: '/dashboard/settings' }
  ]

  return (
    <motion.div
      initial={{ width: 80 }}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 'calc(5rem + 4px)',
        left: 0,
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <S.SidebarContainer>
        <S.ToggleButton onClick={toggleSidebar} $isOpen={isOpen}>
          <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <CaretLeftIcon size={24} weight="bold" />
          </motion.div>
        </S.ToggleButton>
        <S.MenuContainer>
          {menuItems.map((item, index) => (
            <S.MenuItem
              key={index}
              onClick={() => navigate(item.path)}
              $isActive={location.pathname === item.path}
              $isOpen={isOpen}
            >
              <S.IconWrapper>{item.icon}</S.IconWrapper>
              {isOpen && <span>{item.label}</span>}
            </S.MenuItem>
          ))}
        </S.MenuContainer>
        <S.BottomSection>
          <S.LogoutButton onClick={logout}>
            <S.IconWrapper>
              <SignOutIcon size={24} weight="fill" />
            </S.IconWrapper>
            {isOpen && <span>Sair</span>}
          </S.LogoutButton>
        </S.BottomSection>
      </S.SidebarContainer>
    </motion.div>
  )
}
