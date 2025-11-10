import styled from 'styled-components'

export const DialogContent = styled.div`
  &.menu-item-dialog {
    padding: 24px;
    width: 100%;
  }
`

export const DialogHeader = styled.div`
  &.dialog-header {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--restaurant-primary-color);
  }
`

export const ProductImage = styled.img`
  &.product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 16px;
    border: 3px solid var(--restaurant-primary-color);
  }
`

export const ProductInfo = styled.div`
  &.product-info {
    flex: 1;
  }
`

export const ProductTitle = styled.h2`
  &.product-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--restaurant-primary-color);
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
    font-size: 20px;
    font-weight: 700;
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
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    background: var(--restaurant-secondary-color);
    color: white;
  }
`

export const DialogBody = styled.div`
  margin-bottom: 24px;
`

export const OptionalsSection = styled.div`
  margin-bottom: 20px;
`

export const OptionalsTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 12px 0;
`

export const OptionalItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};

  &:last-child {
    border-bottom: none;
  }
`

export const OptionalInfo = styled.div`
  flex: 1;
`

export const OptionalName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  display: block;
`

export const OptionalPrice = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const OptionalControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  background: ${({ theme }) => theme.colors.mx.white};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const QuantityDisplay = styled.span`
  &.quantity-display {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    min-width: 24px;
    text-align: center;
  }
`

export const NotesSection = styled.div`
  margin-top: 24px;
  margin-bottom: 20px;
`

export const QuantitySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const QuantityLabel = styled.span`
  &.quantity-label {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const TotalPrice = styled.div`
  &.total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-top: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};

    span:last-child {
      font-size: 18px;
      color: var(--restaurant-primary-color);
    }
  }
`

export const DialogFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  background: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }
`

export const AddToCartButton = styled.button`
  padding: 12px 24px;
  border: none;
  background: ${({ theme }) => theme.colors.highlight};
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
