import styled from 'styled-components'

export const DialogContent = styled.div`
  &.combo-dialog {
    padding: 24px;
    width: 100%;
  }
`

export const DialogHeader = styled.div`
  &.dialog-header {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  }
`

export const ProductImage = styled.img`
  &.product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
  }
`

export const ProductInfo = styled.div`
  &.product-info {
    flex: 1;
    position: relative;
  }
`

export const ComboBadge = styled.div`
  &.combo-badge {
    display: inline-block;
    background: var(--restaurant-secondary-color);
    color: ${({ theme }) => theme.colors.text.primary};
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }
`

export const ProductTitle = styled.h2`
  &.product-title {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 8px 0;
  }
`

export const ProductDescription = styled.p`
  &.product-description {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0 0 12px 0;
    line-height: 1.4;
  }
`

export const PriceContainer = styled.div`
  &.price-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const Price = styled.span`
  &.price {
    font-size: 16px;
    font-weight: 600;
    color: var(--restaurant-primary-color);
  }
`

export const OriginalPrice = styled.span`
  &.original-price {
    font-size: 14px;
    text-decoration: line-through;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const DiscountBadge = styled.span`
  &.discount-badge {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    background: var(--restaurant-primary-color);
    color: white;
  }
`

export const DialogBody = styled.div`
  margin-bottom: 24px;
`

export const NotesSection = styled.div`
  margin-bottom: 20px;
`

export const QuantitySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const QuantityLabel = styled.span`
  &.quantity-label {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const OptionalControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const QuantityDisplay = styled.span`
  &.quantity-display {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    min-width: 30px;
    text-align: center;
  }
`

export const TotalPrice = styled.div`
  &.total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: ${({ theme }) => theme.colors.mx.gray[50]};
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    color: var(--restaurant-primary-color);
  }
`

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`
