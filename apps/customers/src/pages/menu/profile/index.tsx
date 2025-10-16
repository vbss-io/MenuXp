import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ClientLoginForm } from '@/components/client/client-form/client-login-form'
import { ClientRegisterForm } from '@/components/client/client-form/client-register-form'
import { ClientProfile } from '@/components/client/client-profile'
import { Loading } from '@menuxp/ui'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { getOrdersByClient } from '@/services/order/get-orders-by-client'
import { OrderStatus } from '@/types/order'
import { useQuery } from '@tanstack/react-query'

import { ChildBackButton as BackButton, ChildContainer as Container } from '../styles'
import * as S from './styles'

export const RestaurantProfilePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { restaurant } = useRestaurant({ slug: slug || '' })
  const { client, clearClient } = useClient()
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', client?.id, restaurant?.id],
    queryFn: () =>
      getOrdersByClient({
        clientId: client!.id,
        restaurantId: restaurant!.id.toString()
      }),
    enabled: !!client?.id && !!restaurant?.id
  })

  const historicalOrders = orders
    .filter((order) => order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  const handleLogout = () => {
    clearClient()
  }

  const handleModeChange = (mode: 'login' | 'register') => {
    setAuthMode(mode)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const renderOrderHistory = () => {
    if (isLoadingOrders) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Loading />
        </div>
      )
    }

    if (historicalOrders.length === 0) {
      return (
        <S.EmptyMessage>
          <p>Você ainda não tem pedidos finalizados</p>
        </S.EmptyMessage>
      )
    }

    return (
      <S.OrdersList>
        {historicalOrders.map((order) => {
          const isDelivered = order.status === OrderStatus.DELIVERED
          let statusColor = '#ef4444' // Cancelado
          let statusIcon = <XCircleIcon size={14} weight="fill" />
          let statusLabel = 'Cancelado'

          if (isDelivered) {
            statusColor = '#22c55e' // Entregue
            statusIcon = <CheckCircleIcon size={14} weight="fill" />
            statusLabel = 'Entregue'
          }

          return (
            <S.OrderCard key={order.id}>
              <S.OrderHeader>
                <S.OrderCode>#{order.code}</S.OrderCode>
                <S.OrderStatusBadge color={statusColor}>
                  {statusIcon}
                  {statusLabel}
                </S.OrderStatusBadge>
              </S.OrderHeader>

              <S.OrderDetails>
                <S.OrderDate>
                  {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </S.OrderDate>
                <S.OrderTotal>{formatPrice(order.total)}</S.OrderTotal>
              </S.OrderDetails>

              <S.OrderItems>
                {order.items.map((item, idx) => (
                  <S.OrderItem key={idx}>
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                  </S.OrderItem>
                ))}
              </S.OrderItems>
            </S.OrderCard>
          )
        })}
      </S.OrdersList>
    )
  }

  const renderContent = () => {
    if (!client) {
      if (authMode === 'login') {
        return <ClientLoginForm onModeChange={handleModeChange} mode={authMode} />
      }
      return <ClientRegisterForm onModeChange={handleModeChange} mode={authMode} />
    }

    return (
      <>
        <ClientProfile onLogout={handleLogout} />

        <S.OrderHistorySection>
          <S.HistoryTitle>Histórico de Pedidos</S.HistoryTitle>
          {renderOrderHistory()}
        </S.OrderHistorySection>
      </>
    )
  }

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeftIcon size={20} />
        Voltar ao menu
      </BackButton>
      <S.ProfileContainer>{renderContent()}</S.ProfileContainer>
    </Container>
  )
}
