import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { GetOrdersUsecase } from '@/application/orders/get-orders.usecase'
import { UpdateOrderUsecase } from '@/application/orders/update-order.usecase'
import type { Order, OrderStatus } from '@/domain/models/order.model'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import { OrderDetailDialog } from './components/order-detail-dialog'
import { OrdersKanban } from './components/orders-kanban'

import * as S from './styles'

export const OrdersPage = () => {
  const { restaurantId } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const hasLoadedRef = useRef(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  const handleStatusUpdate = useCallback(async (orderId: string, newStatus: OrderStatus) => {
    try {
      setIsUpdatingStatus(true)
      const updateOrderUsecase = new UpdateOrderUsecase()
      await updateOrderUsecase.execute({ orderId, status: newStatus })

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date() } : order
        )
      )

      toast.success('Status do pedido atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status do pedido')
    } finally {
      setIsUpdatingStatus(false)
    }
  }, [])

  const handleOrderClick = useCallback((order: Order) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }, [])

  const handleCloseDetailDialog = useCallback(() => {
    setIsDetailDialogOpen(false)
    setSelectedOrder(null)
  }, [])

  useEffect(() => {
    if (!restaurantId) {
      setOrders([])
      hasLoadedRef.current = false
      return
    }

    if (hasLoadedRef.current) return

    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const getOrdersUsecase = new GetOrdersUsecase()
        const response = await getOrdersUsecase.execute({
          restaurantId,
          sortField: 'createdAt',
          sortOrder: 'desc'
        })
        setOrders(response.orders)
        hasLoadedRef.current = true
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error)
        toast.error('Erro ao carregar pedidos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [restaurantId])

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <Breadcrumb lastPath="Pedidos" />
      <S.Header>
        <S.Title>Pedidos</S.Title>
        <S.Subtitle>Gerencie os pedidos do seu restaurante</S.Subtitle>
      </S.Header>

      <S.Content>
        {orders.length === 0 ? (
          <S.EmptyState>
            <S.EmptyStateTitle>Nenhum pedido encontrado</S.EmptyStateTitle>
            <S.EmptyStateDescription>
              Quando você receber pedidos, eles aparecerão aqui organizados por status.
            </S.EmptyStateDescription>
          </S.EmptyState>
        ) : (
          <OrdersKanban
            orders={orders}
            onOrderClick={handleOrderClick}
            onStatusUpdate={handleStatusUpdate}
            isUpdatingStatus={isUpdatingStatus}
          />
        )}
      </S.Content>

      {selectedOrder && (
        <OrderDetailDialog
          order={selectedOrder}
          isOpen={isDetailDialogOpen}
          onClose={handleCloseDetailDialog}
          onStatusUpdate={handleStatusUpdate}
          isUpdatingStatus={isUpdatingStatus}
        />
      )}
    </S.Container>
  )
}
