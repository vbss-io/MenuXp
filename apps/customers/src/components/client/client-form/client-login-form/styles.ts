import styled from 'styled-components'

import { getClientLoginFormLayoutStyle } from './layout.styles'

export const FormContainer = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  background: ${({ theme }) => theme.colors.mx.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  max-width: 400px;
  width: 100%;
  transition: all 0.2s ease;

  ${({ $layout }) => $layout && getClientLoginFormLayoutStyle($layout)}
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: color 0.2s ease;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SwitchModeButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  text-decoration: underline;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: color 0.2s ease;
  width: 100%;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`
