import { Popover as VbssPopover } from '@vbss-ui/popover'
import type { ComponentProps } from 'react'
import styled from 'styled-components'

export const StyledPopover = styled(VbssPopover)`
  &[data-state='open'].popover {
    background-color: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.mx.black};
    padding: ${({ theme }) => theme.spacing.lg};
    z-index: 999999;
    pointer-events: auto;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &.primary {
      border: 2px solid ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.mx.white};
    }

    &.secondary {
      border: 2px solid ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.mx.white};
    }

    &.outline {
      border: 2px solid ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
    }

    &.ghost {
      border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
      background-color: ${({ theme }) => theme.colors.mx.gray[50]};
      color: ${({ theme }) => theme.colors.mx.gray[800]};
    }

    &.danger {
      border: 2px solid #ef4444;
      background-color: #ef4444;
      color: ${({ theme }) => theme.colors.mx.white};
    }

    h3 {
      font-family: ${({ theme }) => theme.typography.fonts.title};
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
      color: ${({ theme }) => theme.colors.primary};
      margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
      text-transform: none;
    }

    &.primary h3,
    &.secondary h3,
    &.danger h3 {
      color: ${({ theme }) => theme.colors.mx.white};
    }

    &.ghost h3 {
      color: ${({ theme }) => theme.colors.mx.gray[600]};
    }

    .icons-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(3, 35px);
      gap: ${({ theme }) => theme.spacing.sm};
      pointer-events: auto;
      position: relative;
      z-index: 5;
      height: 120px;
    }

    .icon-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
      background: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
      outline: none;
      position: relative;
      z-index: 10;
      pointer-events: auto;

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        background: rgba(0, 0, 0, 0.2);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary};
      }

      &:active {
        transform: translateY(0);
      }

      &.selected {
        border-color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.mx.white};
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${({ theme }) => theme.spacing.md};
      margin-top: ${({ theme }) => theme.spacing.lg};
    }

    .pagination-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
      background: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      position: relative;
      z-index: 10;
      pointer-events: auto;

      &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.primary};
        background: rgba(0, 0, 0, 0.2);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary};
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }

    .pagination-info {
      font-family: ${({ theme }) => theme.typography.fonts.body};
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
      font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
      color: ${({ theme }) => theme.colors.mx.black};
      min-width: 60px;
      text-align: center;
    }
  }
`

export type PopoverProps = Omit<ComponentProps<typeof VbssPopover>, 'variant'> & {
  className?: string
}
