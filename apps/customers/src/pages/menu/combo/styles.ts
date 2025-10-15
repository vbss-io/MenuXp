import styled from 'styled-components'

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`

export const ComboBadge = styled.div<{ $secondaryColor: string }>`
  display: inline-block;
  background: ${({ $secondaryColor }) => $secondaryColor};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
`

export const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.mx.gray[100]};
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ProductTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const ProductDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`

export const Price = styled.span<{ $primaryColor: string }>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ $primaryColor }) => $primaryColor};
`

export const OriginalPrice = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`

export const DiscountBadge = styled.span<{ $secondaryColor: string }>`
  background-color: ${({ $secondaryColor }) => $secondaryColor};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`

export const ComboItemsSection = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const NotesSection = styled.div`
  margin-bottom: 20px;
`

export const NotesLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  display: block;
  margin-bottom: 8px;
`

export const NotesInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  background: ${({ theme }) => theme.colors.mx.white};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`

export const AddToCartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const QuantityLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const OptionalControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const QuantityDisplay = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 20px;
  text-align: center;
`

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const AddToCartButton = styled.button<{ $primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background-color: ${({ $primaryColor }) => $primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $primaryColor }) => $primaryColor};
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 20px;
`
