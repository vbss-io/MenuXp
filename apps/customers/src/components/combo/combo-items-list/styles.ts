import styled from 'styled-components'

export const Container = styled.div<{ $layout?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`

export const Title = styled.div<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`

export const ItemsList = styled.div<{ $layout?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const Item = styled.div<{
  $layout?: string
  $primaryColor?: string
}>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid ${({ $primaryColor }) => $primaryColor || '#FF8C00'};
`

export const ItemIcon = styled.div<{ $primaryColor?: string }>`
  flex-shrink: 0;
  color: ${({ $primaryColor }) => $primaryColor || '#FF8C00'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`

export const ItemInfo = styled.div<{ $layout?: string }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`

export const ItemName = styled.div<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  word-break: break-word;
`

export const ItemQuantity = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const ItemPrice = styled.div<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  white-space: nowrap;
`
