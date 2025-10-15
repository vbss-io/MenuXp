import styled from 'styled-components'

export const MenuItemCard = styled.div`
  &.menu-item-card {
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.mx.white};
    border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    flex-shrink: 0;
    min-width: 280px;
    max-width: 320px;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform, background-color, color, border-color, box-shadow;
  }
`

export const DiscountChip = styled.div`
  &.discount-chip {
    position: absolute;
    top: 8px;
    left: 8px;
    background: ${({ theme }) => theme.colors.mx.red};
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`

export const MenuItemImage = styled.img`
  &.menu-item-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }
`

export const MenuItemContent = styled.div`
  &.menu-item-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md};
    justify-content: space-between;
  }
`

export const MenuItemName = styled.div`
  &.menu-item-name {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    word-break: break-word;
    flex-shrink: 0;
  }
`

export const MenuItemDescription = styled.div`
  &.menu-item-description {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
`

export const MenuItemFooter = styled.div`
  &.menu-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    gap: ${({ theme }) => theme.spacing.sm};
    flex-shrink: 0;
  }
`

export const MenuItemPrice = styled.div`
  &.menu-item-price {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    flex-wrap: wrap;
  }
`

export const CurrentPrice = styled.span`
  &.current-price {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: 18px;
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.mx.red};
  }
`

export const DiscountPrice = styled.span`
  &.discount-price {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: 18px;
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.mx.red};
  }
`

export const OriginalPrice = styled.span`
  &.original-price {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: line-through;
  }
`
