import styled from 'styled-components'

export const OptionalsContainer = styled.div`
  &.menu-item-optionals {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    width: 100%;
  }
`

export const OptionalsTitle = styled.h3`
  &.optionals-title {
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`

export const OptionalsList = styled.div`
  &.optionals-list {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

export const OptionalItem = styled.div`
  &.optional-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.mx.white};
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
    transition: all 0.2s ease;
  }
`

export const OptionalInfo = styled.div`
  &.optional-info {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
    flex: 1;
  }
`

export const OptionalName = styled.span`
  &.optional-name {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const OptionalPrice = styled.span`
  &.optional-price {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: var(--restaurant-primary-color);
  }
`

export const OptionalControls = styled.div`
  &.optional-controls {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

export const QuantityDisplay = styled.span`
  &.quantity-display {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    min-width: 32px;
    text-align: center;
  }
`
