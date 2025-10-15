import { Clock, User, MapPin, ShoppingCart } from '@phosphor-icons/react'
import styled from 'styled-components'

import type { Order, OrderStatus } from '@/domain/models/order.model'

interface OrderCardProps {
  order: Order
  onClick: () => void
  onDragStart: () => void
  onDragEnd: () => void
  isDragging: boolean
  isUpdatingStatus: boolean
}

const STATUS_CONFIG = {
  scheduled: { color: '#6366F1', bgColor: '#E0E7FF' },
  received: { color: '#F59E0B', bgColor: '#FEF3C7' },
  confirmed: { color: '#3B82F6', bgColor: '#DBEAFE' },
  in_production: { color: '#8B5CF6', bgColor: '#EDE9FE' },
  ready: { color: '#10B981', bgColor: '#D1FAE5' },
  sent_for_delivery: { color: '#059669', bgColor: '#A7F3D0' },
  delivered: { color: '#059669', bgColor: '#A7F3D0' },
  cancelled: { color: '#EF4444', bgColor: '#FEE2E2' }
} as const

const OPERATION_TYPE_LABELS = {
  delivery: 'Entrega',
  pickup: 'Retirada',
  dine_in: 'No Local'
} as const

const PAYMENT_METHOD_LABELS = {
  cash: 'Dinheiro',
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
  pix: 'PIX',
  transfer: 'Transferência'
} as const

export const OrderCard = ({ order, onClick, onDragStart, onDragEnd, isDragging, isUpdatingStatus }: OrderCardProps) => {
  const statusConfig = STATUS_CONFIG[order.status]
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)
  const timeAgo = getTimeAgo(order.createdAt)

  return (
    <S.Card
      onClick={onClick}
      draggable={!isUpdatingStatus}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      $isDragging={isDragging}
      $isUpdatingStatus={isUpdatingStatus}
    >
      <S.CardHeader>
        <S.OrderCode>#{order.code}</S.OrderCode>
        <S.StatusBadge $color={statusConfig.color} $bgColor={statusConfig.bgColor}>
          {getStatusLabel(order.status)}
        </S.StatusBadge>
      </S.CardHeader>

      <S.CustomerInfo>
        <S.CustomerName>
          <User size={16} weight="fill" />
          {order.customer.name}
        </S.CustomerName>

        {order.orderType === 'delivery' && (
          <S.CustomerAddress>
            <MapPin size={16} weight="fill" />
            {order.customer.address.street}, {order.customer.address.number}
          </S.CustomerAddress>
        )}
      </S.CustomerInfo>

      <S.OrderDetails>
        <S.OrderType>{OPERATION_TYPE_LABELS[order.orderType as keyof typeof OPERATION_TYPE_LABELS]}</S.OrderType>

        <S.PaymentMethod>
          {PAYMENT_METHOD_LABELS[order.paymentMethod as keyof typeof PAYMENT_METHOD_LABELS]}
        </S.PaymentMethod>
      </S.OrderDetails>

      <S.ItemsInfo>
        <S.ItemsCount>
          <ShoppingCart size={16} weight="fill" />
          {totalItems} {totalItems === 1 ? 'item' : 'itens'}
        </S.ItemsCount>

        <S.OrderTotal>R$ {order.total.toFixed(2).replace('.', ',')}</S.OrderTotal>
      </S.ItemsInfo>

      <S.TimeInfo>
        <Clock size={14} weight="fill" />
        {timeAgo}
      </S.TimeInfo>

      {order.notes && (
        <S.Notes>
          <S.NotesLabel>Observações:</S.NotesLabel>
          <S.NotesText>{order.notes}</S.NotesText>
        </S.Notes>
      )}
    </S.Card>
  )
}

const getStatusLabel = (status: OrderStatus): string => {
  const labels = {
    scheduled: 'Agendado',
    received: 'Recebido',
    confirmed: 'Confirmado',
    in_production: 'Em Produção',
    ready: 'Pronto',
    sent_for_delivery: 'Enviado para Entrega',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  }
  return labels[status]
}

const getTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'Agora'
  if (diffInMinutes < 60) return `${diffInMinutes}min`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d`
}

const S = {
  Card: styled.div<{ $isDragging: boolean; $isUpdatingStatus: boolean }>`
    background: ${({ theme }) => theme.colors.mx.white};
    border: 1px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: ${({ theme }) => theme.spacing.md};
    cursor: ${({ $isUpdatingStatus }) => ($isUpdatingStatus ? 'not-allowed' : 'pointer')};
    transition: all 0.2s ease;
    position: relative;
    opacity: ${({ $isUpdatingStatus }) => ($isUpdatingStatus ? 0.6 : 1)};

    &:hover {
      ${({ $isUpdatingStatus, theme }) =>
        !$isUpdatingStatus &&
        `
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.brutalistCard}, 0 4px 8px rgba(0, 0, 0, 0.1);
      `}
    }

    ${({ $isDragging, theme }) =>
      $isDragging &&
      `
      transform: rotate(5deg) scale(1.05);
      box-shadow: ${theme.shadows.brutalistCard}, 0 8px 16px rgba(0, 0, 0, 0.2);
      z-index: 10;
    `}
  `,

  CardHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  `,

  OrderCode: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    color: ${({ theme }) => theme.colors.mx.black};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,

  StatusBadge: styled.span<{ $color: string; $bgColor: string }>`
    background: ${({ $bgColor }) => $bgColor};
    color: ${({ $color }) => $color};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,

  CustomerInfo: styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  `,

  CustomerName: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.mx.black};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  `,

  CustomerAddress: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  OrderDetails: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  `,

  OrderType: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    color: ${({ theme }) => theme.colors.mx.black};
    background: ${({ theme }) => theme.colors.mx.yellow};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,

  PaymentMethod: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  ItemsInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  `,

  ItemsCount: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  OrderTotal: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    color: ${({ theme }) => theme.colors.mx.black};
  `,

  TimeInfo: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  `,

  Notes: styled.div`
    padding-top: ${({ theme }) => theme.spacing.sm};
  `,

  NotesLabel: styled.div`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.mx.black};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  `,

  NotesText: styled.div`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  `
}
