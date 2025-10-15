import type { Cart, CartItem } from '@/types/cart'

import * as S from '../styles'

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
      <S.ItemsSection>
        <h3>Revisar Itens</h3>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>Carrinho não encontrado</div>
      </S.ItemsSection>
    )
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <S.ItemsSection>
        <h3>Revisar Itens</h3>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>Carrinho vazio</div>
      </S.ItemsSection>
    )
  }

  return (
    <S.ItemsSection>
      <h3>Revisar Itens</h3>
      {cart.items.map((item, index) => (
        <S.ItemCard key={index}>
          <div style={{ flex: 1 }}>
            <S.ItemInfo>
              <S.ItemName>{item.name}</S.ItemName>
              <S.ItemDetails>
                {item.quantity}x {formatPrice(item.price)}
              </S.ItemDetails>
            </S.ItemInfo>

            {item.optionals && item.optionals.length > 0 && (
              <S.ItemOptionals>
                {item.optionals.map((optional, optIndex) => (
                  <S.OptionalItem key={optIndex}>
                    <span>
                      + {optional.name} ({optional.quantity}x)
                    </span>
                    <span>{formatPrice(optional.price * optional.quantity)}</span>
                  </S.OptionalItem>
                ))}
              </S.ItemOptionals>
            )}
          </div>
          <S.ItemPrice>{formatPrice(calculateItemTotal(item))}</S.ItemPrice>
        </S.ItemCard>
      ))}
      <S.TotalsSection>
        <S.TotalRow>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </S.TotalRow>
        {deliveryFee > 0 && (
          <S.TotalRow>
            <span>Taxa de entrega</span>
            <span>{formatPrice(deliveryFee)}</span>
          </S.TotalRow>
        )}
        <S.TotalRow highlight>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </S.TotalRow>
      </S.TotalsSection>
    </S.ItemsSection>
  )
}
