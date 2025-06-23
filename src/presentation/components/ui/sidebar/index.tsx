import {
  BowlFoodIcon,
  CaretLeftIcon,
  ChatCenteredDotsIcon,
  GameControllerIcon,
  GraphIcon,
  HouseIcon,
  ShoppingCartIcon,
  SignOutIcon
} from '@phosphor-icons/react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSidebar } from '@/presentation/hooks/use-sidebar'

import * as S from './styles'

export const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: <HouseIcon size={24} weight="fill" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <ShoppingCartIcon size={24} weight="fill" />, label: 'Pedidos', path: '/dashboard/orders' },
    { icon: <BowlFoodIcon size={24} weight="fill" />, label: 'Menu', path: '/dashboard/menu' },
    { icon: <GraphIcon size={24} weight="fill" />, label: 'Relatórios', path: '/dashboard/reports' },
    { icon: <GameControllerIcon size={24} weight="fill" />, label: 'Missões', path: '/dashboard/missions' },
    { icon: <ChatCenteredDotsIcon size={24} weight="fill" />, label: 'Mensagens', path: '/dashboard/messages' }
  ]

  return (
    <S.SidebarContainer>
      <S.ToggleButton onClick={toggleSidebar} $isOpen={isOpen}>
        <CaretLeftIcon size={24} weight="bold" />
      </S.ToggleButton>
      <S.MenuContainer>
        {menuItems.map((item, index) => (
          <S.MenuItem key={index} onClick={() => navigate(item.path)} $isActive={location.pathname === item.path}>
            <S.IconWrapper>{item.icon}</S.IconWrapper>
            {isOpen && <span>{item.label}</span>}
          </S.MenuItem>
        ))}
      </S.MenuContainer>
      <S.BottomSection>
        <S.LogoutButton onClick={() => {}}>
          <S.IconWrapper>
            <SignOutIcon size={24} weight="fill" />
          </S.IconWrapper>
          {isOpen && <span>Sair</span>}
        </S.LogoutButton>
      </S.BottomSection>
    </S.SidebarContainer>
  )
}
