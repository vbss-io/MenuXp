import { useRestaurant } from '@/hooks/use-restaurant'
import type { Cart } from '@/types/cart'
import { OperationType, PaymentMethod } from '@/types/order'

import * as S from '../styles'

interface SummaryStepProps {
  cart: Cart | null
  orderType: OperationType
  paymentMethod: PaymentMethod
  isScheduled: boolean
  scheduledDate: string
  scheduledTime: string
  getSelectedAddress: () => {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
  }
  calculateTotal: () => number
}

const getOrderTypeLabel = (type: OperationType) => {
  switch (type) {
    case OperationType.DELIVERY:
      return 'Entrega'
    case OperationType.BALCAO:
      return 'Retirada'
    case OperationType.MESA:
      return 'Consumo no local'
    default:
      return type
  }
}

const getPaymentMethodLabel = (method: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.DINHEIRO:
      return 'Dinheiro'
    case PaymentMethod.CARTAO_CREDITO:
      return 'Cartão de Crédito'
    case PaymentMethod.CARTAO_DEBITO:
      return 'Cartão de Débito'
    case PaymentMethod.PIX:
      return 'PIX'
    default:
      return method
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export const SummaryStep = ({
  cart,
  orderType,
  paymentMethod,
  isScheduled,
  scheduledDate,
  scheduledTime,
  getSelectedAddress,
  calculateTotal
}: SummaryStepProps) => {
  const { restaurant } = useRestaurant()
  const address = getSelectedAddress()

  const subtotal = calculateTotal()
  const deliveryFee = orderType === OperationType.DELIVERY ? restaurant?.settings?.deliveryFee || 0 : 0
  const total = subtotal + deliveryFee

  return (
    <S.SummarySection>
      <h3>Resumo do Pedido</h3>
      {isScheduled && scheduledDate && scheduledTime && (
        <S.SummaryRow>
          <span>Agendamento</span>
          <span style={{ fontSize: '0.875rem', textAlign: 'right' }}>
            {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </S.SummaryRow>
      )}
      <S.SummaryRow>
        <span>Itens ({cart?.items.length || 0})</span>
        <span>{formatPrice(calculateTotal())}</span>
      </S.SummaryRow>
      <S.SummaryRow>
        <span>Tipo de Pedido</span>
        <span>{getOrderTypeLabel(orderType)}</span>
      </S.SummaryRow>
      <S.SummaryRow>
        <span>Forma de Pagamento</span>
        <span>{getPaymentMethodLabel(paymentMethod)}</span>
      </S.SummaryRow>
      {orderType === OperationType.DELIVERY && (
        <S.SummaryRow>
          <span>Endereço</span>
          <span style={{ fontSize: '0.875rem', textAlign: 'right' }}>
            {`${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''}`}
          </span>
        </S.SummaryRow>
      )}
      <div style={{ height: '1px', background: '#e5e7eb', margin: '0.5rem 0' }} />
      <S.SummaryRow>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </S.SummaryRow>
      {orderType === OperationType.DELIVERY && deliveryFee > 0 && (
        <S.SummaryRow>
          <span>Taxa de entrega</span>
          <span>{formatPrice(deliveryFee)}</span>
        </S.SummaryRow>
      )}
      {orderType === OperationType.DELIVERY && deliveryFee === 0 && (
        <S.SummaryRow>
          <span>Taxa de entrega</span>
          <span style={{ color: '#10b981', fontWeight: '600' }}>Grátis</span>
        </S.SummaryRow>
      )}
      <S.SummaryRow style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
        <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>Total</span>
        <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>{formatPrice(total)}</span>
      </S.SummaryRow>
    </S.SummarySection>
  )
}
