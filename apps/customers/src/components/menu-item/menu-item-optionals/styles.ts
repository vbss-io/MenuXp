import styled from 'styled-components'

import { getMenuItemOptionalsLayoutStyle } from './layout.styles'

export const OptionalsContainer = styled.div<{
  $layout: string
  $primaryColor: string
  $secondaryColor: string
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  ${({ $layout }) => getMenuItemOptionalsLayoutStyle($layout)}
`

export const OptionalsTitle = styled.h3<{
  $layout: string
  $primaryColor: string
  $secondaryColor: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const OptionalsList = styled.div<{
  $layout: string
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const OptionalItem = styled.div<{
  $layout: string
  $primaryColor: string
  $secondaryColor: string
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $primaryColor }) => $primaryColor};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`

export const OptionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

export const OptionalName = styled.span<{
  $layout: string
  $primaryColor: string
  $secondaryColor: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

export const OptionalPrice = styled.span<{
  $layout: string
  $primaryColor: string
  $secondaryColor: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ $primaryColor }) => $primaryColor};
`

export const OptionalControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const QuantityDisplay = styled.span<{
  $layout: string
  $primaryColor: string
  $secondaryColor: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 32px;
  text-align: center;
`
