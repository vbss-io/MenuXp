import { RestaurantForm } from '@/presentation/components/entities/restaurants/RestaurantForm'
import { Sidebar } from '@/presentation/components/ui/sidebar'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useSidebar } from '@/presentation/hooks/use-sidebar'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
`

const Main = styled.main<{ $isSidebarOpen: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  transition: margin-left 0.3s;

  @media ${({ theme }) => theme.breakpoints.md} {
    margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '280px' : '80px')};
  }
`

export const Dashboard = () => {
  const { user } = useAuth()
  const { isOpen } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  // useEffect(() => {
  //   if (user?.restaurants.length === 0) {
  //     setShowForm(true)
  //   } else {
  //     setShowForm(false)
  //   }
  // }, [user])

  const handleFormSuccess = () => {
    setShowForm(false)
  }

  if (!user) return null

  if (showForm) {
    return <RestaurantForm onSuccess={handleFormSuccess} />
  }

  return (
    <Container>
      <Sidebar />
      <Main $isSidebarOpen={isOpen}>{location.pathname === '/dashboard' ? <div>Dashboard</div> : <Outlet />}</Main>
    </Container>
  )
}
