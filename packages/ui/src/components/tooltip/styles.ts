import { Tooltip as VbssTooltip } from '@vbss-ui/tooltip'
import styled from 'styled-components'

export const TooltipWrapper = styled.div`
  &.tooltip-wrapper {
    background: transparent;
    border: none;
    outline: none;
    display: inline-block;

    .tooltipContent {
      background-color: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      box-shadow: ${({ theme }) => theme.shadows.md};
      font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
      padding: ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    }

    &.primary .tooltipContent {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.mx.white};
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &.secondary .tooltipContent {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.mx.white};
      border-color: ${({ theme }) => theme.colors.secondary};
    }

    &.outline .tooltipContent {
      background-color: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      border-color: ${({ theme }) => theme.colors.primary};
      border-width: 2px;
    }

    &.ghost .tooltipContent {
      background-color: ${({ theme }) => theme.colors.mx.gray[50]};
      color: ${({ theme }) => theme.colors.mx.gray[800]};
      border-color: ${({ theme }) => theme.colors.mx.gray[200]};
    }

    &.danger .tooltipContent {
      background-color: #ef4444;
      color: ${({ theme }) => theme.colors.mx.white};
      border-color: #ef4444;
    }
  }
`

export interface TooltipProps {
  children: React.ReactNode
  trigger: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'default'
  className?: string
  style?: React.CSSProperties
}

export const VbssTooltipComponent = VbssTooltip
