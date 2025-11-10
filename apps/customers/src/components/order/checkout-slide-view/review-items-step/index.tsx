import { useTranslator } from 'vbss-translator'

import type { Cart, CartItem } from '@/types/cart'
import { useLayout } from '@menuxp/ui'

import * as S from './styles'

interface ReviewItemsStepProps {
  cart: Cart | null
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export const ReviewItemsStep = ({ cart }: ReviewItemsStepProps) => {
  const { t } = useTranslator()
  const { layout } = useLayout()

  const calculateSubtotal = () => {
    if (!cart?.items) return 0
    return cart.items.reduce((total, item) => {
      const itemPrice = item.price
      const optionalsPrice = item.optionals?.reduce((sum, opt) => sum + opt.price * opt.quantity, 0) || 0
      return total + (itemPrice + optionalsPrice) * item.quantity
    }, 0)
  }

  const calculateItemTotal = (item: CartItem) => {
    const itemPrice = item.price
    const optionalsPrice = item.optionals?.reduce((sum, opt) => sum + opt.price * opt.quantity, 0) || 0
    return (itemPrice + optionalsPrice) * item.quantity
  }

  const subtotal = calculateSubtotal()
  const deliveryFee = 0
  const total = subtotal + deliveryFee

  if (!cart) {
    return (
      <S.ReviewItemsStep className={`review-items-step layout-${layout}`}>
        <S.StepTitle className="step-title">{t('Revisar Itens')}</S.StepTitle>
        <S.EmptyState className="empty-state">{t('Carrinho não encontrado')}</S.EmptyState>
      </S.ReviewItemsStep>
    )
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <S.ReviewItemsStep className={`review-items-step layout-${layout}`}>
        <S.StepTitle className="step-title">{t('Revisar Itens')}</S.StepTitle>
        <S.EmptyState className="empty-state">{t('Carrinho vazio')}</S.EmptyState>
      </S.ReviewItemsStep>
    )
  }

  return (
    <S.ReviewItemsStep className={`review-items-step layout-${layout}`}>
      <S.StepTitle className="step-title">{t('Revisar Itens')}</S.StepTitle>
      <S.ItemsList className="items-list">
        {cart.items.map((item, index) => (
          <S.ItemCard key={index} className="item-card">
            <S.ItemContent className="item-content">
              <S.ItemInfo className="item-info">
                <S.ItemName className="item-name">{item.name}</S.ItemName>
                <S.ItemDetails className="item-details">
                  {item.quantity}x {formatPrice(item.price)}
                </S.ItemDetails>
              </S.ItemInfo>

              {item.optionals && item.optionals.length > 0 && (
                <S.ItemOptionals className="item-optionals">
                  {item.optionals.map((optional, optIndex) => (
                    <S.OptionalItem key={optIndex} className="optional-item">
                      <span>
                        + {optional.name} ({optional.quantity}x)
                      </span>
                      <span>{formatPrice(optional.price * optional.quantity)}</span>
                    </S.OptionalItem>
                  ))}
                </S.ItemOptionals>
              )}
            </S.ItemContent>
            <S.ItemPrice className="item-price">{formatPrice(calculateItemTotal(item))}</S.ItemPrice>
          </S.ItemCard>
        ))}
      </S.ItemsList>
      <S.TotalsSection className="totals-section">
        <S.TotalRow className="total-row">
          <span>{t('Subtotal')}</span>
          <span>{formatPrice(subtotal)}</span>
        </S.TotalRow>
        {deliveryFee > 0 && (
          <S.TotalRow className="total-row">
            <span>{t('Taxa de entrega')}</span>
            <span>{formatPrice(deliveryFee)}</span>
          </S.TotalRow>
        )}
        <S.TotalRow $highlight className="total-row highlight">
          <span>{t('Total')}</span>
          <span>{formatPrice(total)}</span>
        </S.TotalRow>
      </S.TotalsSection>
    </S.ReviewItemsStep>
  )
}
