import { Loading, useLayout } from '@menuxp/ui'
import { CheckCircleIcon, ClockIcon, CookingPotIcon, PackageIcon, TruckIcon } from '@phosphor-icons/react'
import { useMemo } from 'react'
import { useTranslator } from 'vbss-translator'

import { type Order, OrderStatus } from '@/types/order'

import * as S from './styles'

interface ActiveOrdersProps {
  isLoading: boolean
  latestOrder?: Order
  otherOrders: Order[]
}

interface TimelineStep {
  status: OrderStatus
  label: string
  icon: JSX.Element
  isCompleted?: boolean
  isActive?: boolean
}

export const ActiveOrders = ({ isLoading, latestOrder, otherOrders }: ActiveOrdersProps) => {
  const { t } = useTranslator()
  const { layout } = useLayout()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getOrderStatusLabel = (status: OrderStatus) => {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.SCHEDULED]: t('Agendado'),
      [OrderStatus.RECEIVED]: t('Recebido'),
      [OrderStatus.CONFIRMED]: t('Confirmado'),
      [OrderStatus.IN_PRODUCTION]: t('Em Produção'),
      [OrderStatus.READY]: t('Pronto'),
      [OrderStatus.SENT_FOR_DELIVERY]: t('Saiu para Entrega'),
      [OrderStatus.DELIVERED]: t('Entregue'),
      [OrderStatus.CANCELLED]: t('Cancelado')
    }

    return labels[status] || status
  }

  const getOrderStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      [OrderStatus.SCHEDULED]: '#6366F1',
      [OrderStatus.RECEIVED]: '#3b82f6',
      [OrderStatus.CONFIRMED]: '#8b5cf6',
      [OrderStatus.IN_PRODUCTION]: '#f59e0b',
      [OrderStatus.READY]: '#10b981',
      [OrderStatus.SENT_FOR_DELIVERY]: '#06b6d4',
      [OrderStatus.DELIVERED]: '#22c55e',
      [OrderStatus.CANCELLED]: '#ef4444'
    }

    return colors[status] || '#6b7280'
  }

  const timeline = useMemo<TimelineStep[]>(() => {
    if (!latestOrder) return []

    const steps: TimelineStep[] = [
      {
        status: OrderStatus.RECEIVED,
        label: t('Recebido'),
        icon: <ClockIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.CONFIRMED,
        label: t('Confirmado'),
        icon: <CheckCircleIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.IN_PRODUCTION,
        label: t('Preparando'),
        icon: <CookingPotIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.READY,
        label: t('Pronto'),
        icon: <PackageIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.SENT_FOR_DELIVERY,
        label: t('Saiu p/ Entrega'),
        icon: <TruckIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.DELIVERED,
        label: t('Entregue'),
        icon: <CheckCircleIcon size={20} weight="fill" />
      }
    ]

    const currentIndex = steps.findIndex((step) => step.status === latestOrder.status)

    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isActive: index === currentIndex
    }))
  }, [latestOrder, t])

  if (isLoading) {
    return (
      <S.Container className={`active-orders layout-${layout}`}>
        <S.SectionTitle className="section-title">{t('Seu Pedido')}</S.SectionTitle>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', width: '100%' }}>
          <Loading />
        </div>
      </S.Container>
    )
  }

  if (!latestOrder) {
    return null
  }

  return (
    <S.Container className={`active-orders layout-${layout}`}>
      <S.SectionTitle className="section-title">{t('Acompanhe seu Pedido')}</S.SectionTitle>
      <S.CurrentOrderCard className="current-order-card">
        <S.OrderHeader className="order-header">
          <S.OrderCode className="order-code">
            {t('Pedido')} #{latestOrder.code}
          </S.OrderCode>
          <S.OrderStatus className="order-status" color={getOrderStatusColor(latestOrder.status)}>
            {getOrderStatusLabel(latestOrder.status)}
          </S.OrderStatus>
        </S.OrderHeader>
        <S.OrderTimeline className="order-timeline">
          {timeline.map((step, index) => (
            <S.TimelineStep key={step.status} className="timeline-step">
              <S.TimelineIcon
                className={`timeline-icon${step.isActive ? ' timeline-icon-active' : ''}${step.isCompleted ? ' timeline-icon-completed' : ''}`}
                isCompleted={Boolean(step.isCompleted)}
                isActive={Boolean(step.isActive)}
              >
                {step.icon}
              </S.TimelineIcon>
              <S.TimelineContent className="timeline-content">
                <S.TimelineLabel
                  className={`timeline-label${step.isActive ? ' timeline-label-active' : ''}${step.isCompleted ? ' timeline-label-completed' : ''}`}
                  isCompleted={Boolean(step.isCompleted)}
                  isActive={Boolean(step.isActive)}
                >
                  {step.label}
                </S.TimelineLabel>
              </S.TimelineContent>
              {index < timeline.length - 1 ? (
                <S.TimelineLine
                  className={`timeline-line${step.isCompleted ? ' timeline-line-completed' : ''}`}
                  isCompleted={Boolean(step.isCompleted)}
                />
              ) : null}
            </S.TimelineStep>
          ))}
        </S.OrderTimeline>
        <S.OrderInfo className="order-info">
          <S.OrderDate className="order-date">
            {new Date(latestOrder.createdAt).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </S.OrderDate>
          <S.OrderTotal className="order-total">{formatPrice(latestOrder.total)}</S.OrderTotal>
        </S.OrderInfo>
      </S.CurrentOrderCard>
      {otherOrders.length > 0 ? (
        <S.OtherOrdersSection className="other-orders-section">
          <S.OtherOrdersTitle className="other-orders-title">
            {t('Outros pedidos em andamento')} ({otherOrders.length})
          </S.OtherOrdersTitle>
          <S.OtherOrdersList className="other-orders-list">
            {otherOrders.map((order) => (
              <S.CompactOrderCard key={order.id} className="compact-order-card">
                <S.CompactOrderHeader className="compact-order-header">
                  <S.CompactOrderCode className="compact-order-code">#{order.code}</S.CompactOrderCode>
                  <S.CompactOrderStatus className="compact-order-status" color={getOrderStatusColor(order.status)}>
                    {getOrderStatusLabel(order.status)}
                  </S.CompactOrderStatus>
                </S.CompactOrderHeader>
                <S.CompactOrderInfo className="compact-order-info">
                  <S.CompactOrderDate className="compact-order-date">
                    {new Date(order.createdAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </S.CompactOrderDate>
                  <S.CompactOrderTotal className="compact-order-total">{formatPrice(order.total)}</S.CompactOrderTotal>
                </S.CompactOrderInfo>
              </S.CompactOrderCard>
            ))}
          </S.OtherOrdersList>
        </S.OtherOrdersSection>
      ) : null}
    </S.Container>
  )
}
