import { UserRole } from '@/domain/enums/users/user-role.enum'
import { Sidebar } from '@/presentation/components/ui/sidebar'
import { RestaurantPendingBanner } from '@/presentation/components/entities/restaurants/restaurant-pending-banner'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useSidebar } from '@/presentation/hooks/use-sidebar'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
`

const Main = styled.main<{ $isSidebarOpen: boolean; $isCreatingRestaurant: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  transition: margin-left 0.3s;

  @media ${({ theme }) => theme.breakpoints.md} {
    margin-left: ${({ $isSidebarOpen, $isCreatingRestaurant }) =>
      $isSidebarOpen && !$isCreatingRestaurant ? '280px' : '80px'};
  }
`

export const Dashboard = () => {
  const { user, restaurantId } = useAuth()
  const { isOpen } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const isCreatingRestaurant = location.pathname === '/dashboard/create-restaurant'

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
    <Container>
      {isCreatingRestaurant ? null : <Sidebar />}
      <Main $isSidebarOpen={isOpen} $isCreatingRestaurant={isCreatingRestaurant}>
        <RestaurantPendingBanner />
        {location.pathname === '/dashboard' ? <div>Dashboard</div> : <Outlet />}
      </Main>
    </Container>
  )
}
