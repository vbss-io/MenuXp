import styled from 'styled-components'

import { getComboCardLayoutStyle } from './layout.styles'

export const ComboCard = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
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

  ${({ $layout }) => $layout && getComboCardLayoutStyle($layout)}
`

export const ComboBadge = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${({ $secondaryColor }) => $secondaryColor || '#FEBA0C'};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const DiscountChip = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${({ $primaryColor }) => $primaryColor || '#FF6B00'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 4px;
`

export const ComboImage = styled.img<{ $layout?: string }>`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.mx.gray[100]};
`

export const ComboContent = styled.div<{ $layout?: string }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
`

export const ComboName = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  word-break: break-word;
  flex-shrink: 0;
`

export const ComboDescription = styled.div<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`

export const ComboItemsCount = styled.div<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const ComboFooter = styled.div<{ $layout?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`

export const ComboPrice = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

export const CurrentPrice = styled.span<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ $primaryColor }) => $primaryColor || '#FF8C00'};
`

export const DiscountPrice = styled.span<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ $primaryColor }) => $primaryColor || '#FF8C00'};
`

export const OriginalPrice = styled.span<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`
