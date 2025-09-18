import { useState, useEffect } from 'react'
import { UserIcon, MapPinIcon, ShoppingCartIcon, PhoneIcon, CalendarIcon, CheckCircleIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

import { Dialog } from '@/presentation/components/ui/dialog'
import { type Order, OrderStatus } from '@/domain/models/order.model'

interface OrderDetailDialogProps {
  order: Order
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => Promise<void>
  isUpdatingStatus: boolean
}

const STATUS_OPTIONS: Array<{ value: OrderStatus; label: string; color: string }> = [
  { value: OrderStatus.RECEIVED, label: 'Recebido', color: '#F59E0B' },
  { value: OrderStatus.CONFIRMED, label: 'Confirmado', color: '#3B82F6' },
  { value: OrderStatus.IN_PRODUCTION, label: 'Em Produção', color: '#8B5CF6' },
  { value: OrderStatus.READY, label: 'Pronto', color: '#10B981' },
  { value: OrderStatus.SENT_FOR_DELIVERY, label: 'Enviado para Entrega', color: '#059669' },
  { value: OrderStatus.DELIVERED, label: 'Entregue', color: '#059669' },
  { value: OrderStatus.CANCELLED, label: 'Cancelado', color: '#EF4444' }
]

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

export const OrderDetailDialog = ({
  order,
  isOpen,
  onClose,
  onStatusUpdate,
  isUpdatingStatus
}: OrderDetailDialogProps) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status)

  useEffect(() => {
    setSelectedStatus(order.status)
  }, [order.status])

  const handleStatusUpdate = async () => {
    if (selectedStatus !== order.status) {
      await onStatusUpdate(order.id, selectedStatus)
    }
  }

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <S.DialogContent>
        <S.DialogTitle>Detalhes do Pedido #{order.code}</S.DialogTitle>

        <S.Content>
          {/* Status Section */}
          <S.Section>
            <S.SectionTitle>Status do Pedido</S.SectionTitle>
            <S.StatusSelector>
              {STATUS_OPTIONS.map((option) => (
                <S.StatusOption
                  key={option.value}
                  $isSelected={selectedStatus === option.value}
                  $color={option.color}
                  onClick={() => setSelectedStatus(option.value)}
                  disabled={isUpdatingStatus}
                >
                  <CheckCircleIcon size={16} weight="fill" />
                  {option.label}
                </S.StatusOption>
              ))}
            </S.StatusSelector>

            {selectedStatus !== order.status && (
              <S.UpdateButton onClick={handleStatusUpdate} disabled={isUpdatingStatus}>
                {isUpdatingStatus ? 'Atualizando...' : 'Atualizar Status'}
              </S.UpdateButton>
            )}
          </S.Section>
          <S.Section>
            <S.SectionTitle>Informações do Cliente</S.SectionTitle>
            <S.CustomerInfo>
              <S.InfoRow>
                <UserIcon size={20} weight="fill" />
                <S.InfoLabel>Nome:</S.InfoLabel>
                <S.InfoValue>{order.customer.name}</S.InfoValue>
              </S.InfoRow>

              <S.InfoRow>
                <PhoneIcon size={20} weight="fill" />
                <S.InfoLabel>Telefone:</S.InfoLabel>
                <S.InfoValue>{order.customer.phone}</S.InfoValue>
              </S.InfoRow>
              {order.orderType === 'delivery' && (
                <S.InfoRow>
                  <MapPinIcon size={20} weight="fill" />
                  <S.InfoLabel>Endereço:</S.InfoLabel>
                  <S.InfoValue>
                    {order.customer.address.street}, {order.customer.address.number}
                    {order.customer.address.complement && ` - ${order.customer.address.complement}`}
                    <br />
                    {order.customer.address.neighborhood}, {order.customer.address.city} -{' '}
                    {order.customer.address.state}
                  </S.InfoValue>
                </S.InfoRow>
              )}
            </S.CustomerInfo>
          </S.Section>
          <S.Section>
            <S.SectionTitle>Detalhes do Pedido</S.SectionTitle>
            <S.OrderDetails>
              <S.InfoRow>
                <CalendarIcon size={20} weight="fill" />
                <S.InfoLabel>Data/Hora:</S.InfoLabel>
                <S.InfoValue>{formatDate(order.createdAt)}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <ShoppingCartIcon size={20} weight="fill" />
                <S.InfoLabel>Tipo:</S.InfoLabel>
                <S.InfoValue>
                  {OPERATION_TYPE_LABELS[order.orderType as keyof typeof OPERATION_TYPE_LABELS]}
                </S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>Forma de Pagamento:</S.InfoLabel>
                <S.InfoValue>
                  {PAYMENT_METHOD_LABELS[order.paymentMethod as keyof typeof PAYMENT_METHOD_LABELS]}
                </S.InfoValue>
              </S.InfoRow>
            </S.OrderDetails>
          </S.Section>
          <S.Section>
            <S.SectionTitle>Itens do Pedido</S.SectionTitle>
            <S.ItemsList>
              {order.items.map((item, index) => (
                <S.ItemRow key={index}>
                  <S.ItemInfo>
                    <S.ItemName>{item.name}</S.ItemName>
                    <S.ItemQuantity>Qtd: {item.quantity}</S.ItemQuantity>
                  </S.ItemInfo>
                  <S.ItemPrice>{formatCurrency(item.price * item.quantity)}</S.ItemPrice>
                </S.ItemRow>
              ))}
            </S.ItemsList>
          </S.Section>
          <S.Section>
            <S.SectionTitle>Resumo Financeiro</S.SectionTitle>
            <S.TotalsList>
              <S.TotalRow>
                <S.TotalLabel>Subtotal:</S.TotalLabel>
                <S.TotalValue>{formatCurrency(order.subtotal)}</S.TotalValue>
              </S.TotalRow>
              {order.deliveryFee && order.deliveryFee > 0 && (
                <S.TotalRow>
                  <S.TotalLabel>Taxa de Entrega:</S.TotalLabel>
                  <S.TotalValue>{formatCurrency(order.deliveryFee)}</S.TotalValue>
                </S.TotalRow>
              )}
              {order.discount && order.discount > 0 && (
                <S.TotalRow>
                  <S.TotalLabel>Desconto:</S.TotalLabel>
                  <S.TotalValue>-{formatCurrency(order.discount)}</S.TotalValue>
                </S.TotalRow>
              )}
              <S.TotalRow $isTotal>
                <S.TotalLabel>Total:</S.TotalLabel>
                <S.TotalValue>{formatCurrency(order.total)}</S.TotalValue>
              </S.TotalRow>
            </S.TotalsList>
          </S.Section>
          {order.notes && (
            <S.Section>
              <S.SectionTitle>Observações</S.SectionTitle>
              <S.Notes>{order.notes}</S.Notes>
            </S.Section>
          )}
        </S.Content>
        <S.Footer>
          <S.CloseButton onClick={onClose}>Fechar</S.CloseButton>
        </S.Footer>
      </S.DialogContent>
    </Dialog>
  )
}

const S = {
  DialogContent: styled.div`
    padding: ${({ theme }) => theme.spacing.lg};
    overflow-y: auto;
    max-height: 80vh;
    background: ${({ theme }) => theme.colors.mx.white};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  `,

  DialogTitle: styled.h2`
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    color: ${({ theme }) => theme.colors.mx.black};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mx.black};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  `,

  Section: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  `,

  SectionTitle: styled.h3`
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    color: ${({ theme }) => theme.colors.mx.black};
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mx.black};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
  `,

  StatusSelector: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
  `,

  StatusOption: styled.button<{ $isSelected: boolean; $color: string }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme, $isSelected, $color }) => ($isSelected ? $color : theme.colors.mx.black)};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    background: ${({ $isSelected, $color }) => ($isSelected ? `${$color}20` : 'transparent')};
    color: ${({ theme, $isSelected, $color }) => ($isSelected ? $color : theme.colors.mx.black)};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,

  UpdateButton: styled.button`
    align-self: flex-start;
    margin-top: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.white};
    border: 1px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,

  CustomerInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  `,

  OrderDetails: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  `,

  InfoRow: styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  `,

  InfoLabel: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.mx.black};
    min-width: 120px;
  `,

  InfoValue: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    flex: 1;
  `,

  ItemsList: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  `,

  ItemRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  `,

  ItemInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  `,

  ItemName: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    color: ${({ theme }) => theme.colors.mx.black};
  `,

  ItemQuantity: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  ItemPrice: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    color: ${({ theme }) => theme.colors.mx.black};
  `,

  TotalsList: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  `,

  TotalRow: styled.div<{ $isTotal?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm};
    border-top: ${({ theme, $isTotal }) => ($isTotal ? `1px solid ${theme.colors.mx.black}` : 'none')};
    font-weight: ${({ $isTotal }) => ($isTotal ? 'bold' : 'normal')};
  `,

  TotalLabel: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.mx.black};
  `,

  TotalValue: styled.span`
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.mx.black};
  `,

  Notes: styled.div`
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.mx.yellow}20;
    border: 1px solid ${({ theme }) => theme.colors.mx.yellow};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  `,

  Footer: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.lg};
    padding-top: ${({ theme }) => theme.spacing.lg};
  `,

  CloseButton: styled.button`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      color: ${({ theme }) => theme.colors.mx.white};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `
}
