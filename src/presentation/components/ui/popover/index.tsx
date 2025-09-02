import { Popover as VbssPopover } from '@vbss-ui/popover'
import React from 'react'
import styled from 'styled-components'

const StyledPopover = styled(VbssPopover)`
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.mx.black};
    border: 2px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
    box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
    padding: ${({ theme }) => theme.spacing.lg};
    z-index: 999999;
    pointer-events: auto;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE e Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari e Opera */
    }

    &[data-variant='primary'] {
      background-color: ${({ theme }) => theme.colors.mx.white};
      border: 2px solid ${({ theme }) => theme.colors.mx.black};
      color: ${({ theme }) => theme.colors.mx.black};
    }

    &[data-variant='secondary'] {
      background-color: ${({ theme }) => theme.colors.mx.red};
      border: 2px solid ${({ theme }) => theme.colors.mx.black};
      color: ${({ theme }) => theme.colors.mx.white};
    }

    &[data-variant='outline'] {
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.colors.mx.black};
      color: ${({ theme }) => theme.colors.mx.black};
    }

    h3 {
      font-family: ${({ theme }) => theme.typography.fonts.title};
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
      font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
      color: ${({ theme }) => theme.colors.mx.black};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
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
      border-radius: ${({ theme }) => theme.borderRadius.brutalist};
      background: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
      outline: none;
      position: relative;
      z-index: 10;
      pointer-events: auto;
      box-shadow: ${({ theme }) => theme.shadows.brutalistCard};

      &:hover {
        border-color: ${({ theme }) => theme.colors.mx.black};
        background: ${({ theme }) => theme.colors.mx.gray[100]};
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.mx.red};
      }

      &:active {
        transform: translateY(0);
        box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
      }

      &.selected {
        border-color: ${({ theme }) => theme.colors.mx.black};
        background: ${({ theme }) => theme.colors.mx.black};
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
      border-radius: ${({ theme }) => theme.borderRadius.brutalist};
      background: ${({ theme }) => theme.colors.mx.white};
      color: ${({ theme }) => theme.colors.mx.black};
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      position: relative;
      z-index: 10;
      pointer-events: auto;
      box-shadow: ${({ theme }) => theme.shadows.brutalistCard};

      &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.mx.black};
        background: ${({ theme }) => theme.colors.mx.gray[100]};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.mx.red};
      }

      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
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

export type PopoverProps = React.ComponentProps<typeof VbssPopover>

export const Popover = ({ ...props }: PopoverProps) => {
  return (
    <StyledPopover
      {...props}
      variant={props.variant ?? 'outline'}
      size={props.size ?? 'md'}
      rounded={props.rounded ?? 'none'}
      side={props.side ?? 'bottom'}
      align={props.align ?? 'start'}
      sideOffset={props.sideOffset ?? 15}
      style={{
        zIndex: 9999999,
        position: 'relative',
        ...props.style
      }}
    />
  )
}

Popover.displayName = 'Popover'

export default Popover
