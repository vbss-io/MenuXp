import { useLayout } from '@menuxp/ui'
import { useTranslator } from 'vbss-translator'

import { useRestaurant } from '@/hooks/use-restaurant'
import type { Cart } from '@/types/cart'
import { OperationType, PaymentMethod } from '@/types/order'

import * as S from './styles'

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

const getOrderTypeLabel = (type: OperationType, t: (key: string) => string) => {
  switch (type) {
    case OperationType.DELIVERY:
      return t('Entrega')
    case OperationType.BALCAO:
      return t('Retirada')
    case OperationType.MESA:
      return t('Consumo no local')
    default:
      return type
  }
}

const getPaymentMethodLabel = (method: PaymentMethod, t: (key: string) => string) => {
  switch (method) {
    case PaymentMethod.DINHEIRO:
      return t('Dinheiro')
    case PaymentMethod.CARTAO_CREDITO:
      return t('Cartão de Crédito')
    case PaymentMethod.CARTAO_DEBITO:
      return t('Cartão de Débito')
    case PaymentMethod.PIX:
      return t('PIX')
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
  const { t } = useTranslator()
  const { layout } = useLayout()
  const { restaurant } = useRestaurant()
  const address = getSelectedAddress()

  const subtotal = calculateTotal()
  const deliveryFee = orderType === OperationType.DELIVERY ? restaurant?.settings?.deliveryFee || 0 : 0
  const total = subtotal + deliveryFee

  return (
    <S.SummaryStep className={`summary-step layout-${layout}`}>
      <S.SummaryTitle className="summary-title">{t('Resumo do Pedido')}</S.SummaryTitle>
      {isScheduled && scheduledDate && scheduledTime && (
        <S.SummaryRow className="summary-row">
          <S.SummaryLabel className="summary-label">{t('Agendamento')}</S.SummaryLabel>
          <S.SummaryValue className="summary-value">
            {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </S.SummaryValue>
        </S.SummaryRow>
      )}
      <S.SummaryRow className="summary-row">
        <S.SummaryLabel className="summary-label">
          {t('Itens')} ({cart?.items.length || 0})
        </S.SummaryLabel>
        <S.SummaryValue className="summary-value">{formatPrice(calculateTotal())}</S.SummaryValue>
      </S.SummaryRow>
      <S.SummaryRow className="summary-row">
        <S.SummaryLabel className="summary-label">{t('Tipo de Pedido')}</S.SummaryLabel>
        <S.SummaryValue className="summary-value">{getOrderTypeLabel(orderType, t)}</S.SummaryValue>
      </S.SummaryRow>
      <S.SummaryRow className="summary-row">
        <S.SummaryLabel className="summary-label">{t('Forma de Pagamento')}</S.SummaryLabel>
        <S.SummaryValue className="summary-value">{getPaymentMethodLabel(paymentMethod, t)}</S.SummaryValue>
      </S.SummaryRow>
      {orderType === OperationType.DELIVERY && (
        <S.SummaryRow className="summary-row">
          <S.SummaryLabel className="summary-label">{t('Endereço')}</S.SummaryLabel>
          <S.SummaryValue className="summary-value">
            {`${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''}`}
          </S.SummaryValue>
        </S.SummaryRow>
      )}
      <S.SummaryDivider className="summary-divider" />
      <S.SummaryRow className="summary-row">
        <S.SummaryLabel className="summary-label">{t('Subtotal')}</S.SummaryLabel>
        <S.SummaryValue className="summary-value">{formatPrice(subtotal)}</S.SummaryValue>
      </S.SummaryRow>
      {orderType === OperationType.DELIVERY && deliveryFee > 0 && (
        <S.SummaryRow className="summary-row">
          <S.SummaryLabel className="summary-label">{t('Taxa de entrega')}</S.SummaryLabel>
          <S.SummaryValue className="summary-value">{formatPrice(deliveryFee)}</S.SummaryValue>
        </S.SummaryRow>
      )}
      {orderType === OperationType.DELIVERY && deliveryFee === 0 && (
        <S.SummaryRow className="summary-row">
          <S.SummaryLabel className="summary-label">{t('Taxa de entrega')}</S.SummaryLabel>
          <S.FreeDeliveryText className="free-delivery">{t('Grátis')}</S.FreeDeliveryText>
        </S.SummaryRow>
      )}
      <S.SummaryRow className="summary-row">
        <S.SummaryTotalLabel className="summary-total-label">{t('Total')}</S.SummaryTotalLabel>
        <S.SummaryTotalValue className="summary-total-value">{formatPrice(total)}</S.SummaryTotalValue>
      </S.SummaryRow>
    </S.SummaryStep>
  )
}
