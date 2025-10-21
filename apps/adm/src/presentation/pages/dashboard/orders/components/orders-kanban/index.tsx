import type { Order, OrderStatus } from '@/domain/models/order.model'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import styled from 'styled-components'

import { OrderCard } from './order-card'

interface OrdersKanbanProps {
  orders: Order[]
  onOrderClick: (order: Order) => void
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => Promise<void>
  isUpdatingStatus: boolean
  acceptsScheduling?: boolean
}

const STATUS_CONFIG = {
  scheduled: {
    title: 'Agendados',
    color: '#6366F1',
    bgColor: '#E0E7FF'
  },
  received: {
    title: 'Recebidos',
    color: '#F59E0B',
    bgColor: '#FEF3C7'
  },
  confirmed: {
    title: 'Confirmados',
    color: '#3B82F6',
    bgColor: '#DBEAFE'
  },
  in_production: {
    title: 'Em Produção',
    color: '#8B5CF6',
    bgColor: '#EDE9FE'
  },
  ready: {
    title: 'Prontos',
    color: '#10B981',
    bgColor: '#D1FAE5'
  },
  sent_for_delivery: {
    title: 'Enviados para Entrega',
    color: '#059669',
    bgColor: '#A7F3D0'
  },
  delivered: {
    title: 'Entregues',
    color: '#059669',
    bgColor: '#A7F3D0'
  },
  cancelled: {
    title: 'Cancelados',
    color: '#EF4444',
    bgColor: '#FEE2E2'
  }
} as const

export const OrdersKanban = ({
  orders,
  onOrderClick,
  onStatusUpdate,
  isUpdatingStatus,
  acceptsScheduling = false
}: OrdersKanbanProps) => {
  const [draggedOrder, setDraggedOrder] = useState<Order | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<OrderStatus | null>(null)
  const dragCounter = useRef(0)

  const ordersByStatus = orders.reduce(
    (acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = []
      }
      acc[order.status].push(order)
      return acc
    },
    {} as Record<OrderStatus, Order[]>
  )

  const visibleStatuses = (Object.keys(STATUS_CONFIG) as OrderStatus[]).filter((status) => {
    if (status === 'scheduled') {
      return acceptsScheduling
    }
    return true
  })

  const handleDragStart = (order: Order) => {
    setDraggedOrder(order)
  }

  const handleDragEnd = () => {
    setDraggedOrder(null)
    setDragOverStatus(null)
    dragCounter.current = 0
  }

  const handleDragOver = (e: React.DragEvent, status: OrderStatus) => {
    e.preventDefault()
    if (draggedOrder && draggedOrder.status !== status) {
      setDragOverStatus(status)
    }
  }

  const handleDragEnter = (e: React.DragEvent, status: OrderStatus) => {
    e.preventDefault()
    dragCounter.current++
    if (draggedOrder && draggedOrder.status !== status) {
      setDragOverStatus(status)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setDragOverStatus(null)
    }
  }

  const handleDrop = async (e: React.DragEvent, targetStatus: OrderStatus) => {
    e.preventDefault()
    dragCounter.current = 0
    setDragOverStatus(null)

    if (draggedOrder && draggedOrder.status !== targetStatus) {
      await onStatusUpdate(draggedOrder.id, targetStatus)
    }
  }

  return (
    <S.KanbanContainer>
      <S.KanbanGrid>
        {visibleStatuses.map((status) => {
          const config = STATUS_CONFIG[status]
          const statusOrders = ordersByStatus[status] || []
          const isDragOver = dragOverStatus === status
          return (
            <S.KanbanColumn
              key={status}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragEnter={(e) => handleDragEnter(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
              $isDragOver={isDragOver}
            >
              <S.ColumnHeader $color={config.color} $bgColor={config.bgColor}>
                <S.ColumnTitle>{config.title}</S.ColumnTitle>
                <S.OrderCount>{statusOrders.length}</S.OrderCount>
              </S.ColumnHeader>
              <S.ColumnContent>
                <AnimatePresence>
                  {statusOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <OrderCard
                        order={order}
                        onClick={() => onOrderClick(order)}
                        onDragStart={() => handleDragStart(order)}
                        onDragEnd={handleDragEnd}
                        isDragging={draggedOrder?.id === order.id}
                        isUpdatingStatus={isUpdatingStatus}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {statusOrders.length === 0 && (
                  <S.EmptyColumn>
                    <S.EmptyText>Nenhum pedido</S.EmptyText>
                  </S.EmptyColumn>
                )}
              </S.ColumnContent>
            </S.KanbanColumn>
          )
        })}
      </S.KanbanGrid>
    </S.KanbanContainer>
  )
}

const S = {
  KanbanContainer: styled.div`
    width: 100%;
    overflow-x: auto;
    padding-bottom: ${({ theme }) => theme.spacing.md};
  `,

  KanbanGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    min-width: max-content;
  `,

  KanbanColumn: styled.div<{ $isDragOver: boolean }>`
    background: ${({ theme }) => theme.colors.mx.white};
    border: 1px solid ${({ theme, $isDragOver }) => ($isDragOver ? theme.colors.mx.red : theme.colors.mx.black)};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
    min-height: 500px;
    transition: all 0.2s ease;

    ${({ $isDragOver, theme }) =>
      $isDragOver &&
      `
      transform: scale(1.02);
      box-shadow: ${theme.shadows.brutalistCard}, 0 0 0 4px ${theme.colors.mx.red}40;
    `}
  `,

  ColumnHeader: styled.div<{ $color: string; $bgColor: string }>`
    background: ${({ $bgColor }) => $bgColor};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mx.black};
    padding: ${({ theme }) => theme.spacing.md};
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  ColumnTitle: styled.h3`
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    color: ${({ theme }) => theme.colors.mx.black};
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,

  OrderCount: styled.span`
    background: ${({ theme }) => theme.colors.mx.black};
    color: ${({ theme }) => theme.colors.mx.white};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    min-width: 24px;
    text-align: center;
  `,

  ColumnContent: styled.div`
    padding: ${({ theme }) => theme.spacing.md};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    min-height: 400px;
  `,

  EmptyColumn: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  `,

  EmptyText: styled.p`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    margin: 0;
  `
}
