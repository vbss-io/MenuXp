import { UserRole } from '@/domain/enums/users/user-role.enum'
import { RestaurantPendingBanner } from '@/presentation/components/entities/restaurants/restaurant-pending-banner'
import { Sidebar } from '@/presentation/components/ui/sidebar'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useSidebar } from '@/presentation/hooks/use-sidebar'
import { OperationPage } from '@/presentation/pages/dashboard/operation'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div<{ $isMobile: boolean }>`
  min-height: 100vh;
  margin-top: ${({ $isMobile }) => ($isMobile ? '4rem' : '0')};
  display: flex;
  flex-direction: column;
`

const Main = styled.main<{ $isSidebarOpen: boolean; $isCreatingRestaurant: boolean }>`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  transition: margin-left 0.3s;

  @media ${({ theme }) => theme.breakpoints.md} {
    margin-left: ${({ $isSidebarOpen, $isCreatingRestaurant }) =>
      $isSidebarOpen && !$isCreatingRestaurant ? '280px' : '80px'};
  }
`

export const Dashboard = () => {
  const { user, restaurantId } = useAuth()
  const { isOpen } = useSidebar()
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isCreatingRestaurant = location.pathname === '/dashboard/create-restaurant'

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    if (user?.role === UserRole.RESTAURANT_OWNER && !restaurantId && !isCreatingRestaurant) {
      navigate('/dashboard/create-restaurant')
    }
  }, [isCreatingRestaurant, location.pathname, navigate, restaurantId, user])

  if (!user) return null

  return (
    <Container $isMobile={isMobile}>
      {isCreatingRestaurant ? null : <Sidebar />}
      <Main $isSidebarOpen={isOpen} $isCreatingRestaurant={isCreatingRestaurant}>
        <RestaurantPendingBanner />
        {location.pathname === '/dashboard' ? <OperationPage /> : <Outlet />}
      </Main>
    </Container>
  )
}
