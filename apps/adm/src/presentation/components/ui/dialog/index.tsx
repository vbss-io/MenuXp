import { Dialog as VbssDialog } from '@vbss-ui/dialog'
import React from 'react'
import styled from 'styled-components'

const StyledDialog = styled(VbssDialog)`
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.mx.black};
    border: 1px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
    padding: ${({ theme }) => theme.spacing.lg};
    max-height: 85vh;
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.mx.gray[400]} transparent;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.mx.gray[400]};
      border-radius: ${({ theme }) => theme.borderRadius.xs};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.mx.gray[500]};
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 16px;
      background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      z-index: 2;
      pointer-events: none;
    }

    h2 {
      font-family: ${({ theme }) => theme.typography.fonts.title};
      font-size: ${({ theme }) => theme.typography.fontSizes.lg};
      font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
      color: ${({ theme }) => theme.colors.mx.black};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    }

    p {
      font-family: ${({ theme }) => theme.typography.fonts.body};
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
      color: ${({ theme }) => theme.colors.text.secondary};
      line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
      margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.lg};
    }
  }
`

export type DialogProps = React.ComponentProps<typeof VbssDialog>

export const Dialog = ({ ...props }: DialogProps) => {
  return (
    <StyledDialog
      {...props}
      rounded={props.rounded ?? 'none'}
      fontSize={props.fontSize ?? 'sm'}
      style={{
        maxWidth: '80vw',
        ...props.style
      }}
    />
  )
}

Dialog.displayName = 'Dialog'

export default Dialog
