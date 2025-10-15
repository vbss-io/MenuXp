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
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE e Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari e Opera */
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
        maxHeight: '80vh',
        ...props.style
      }}
    />
  )
}

Dialog.displayName = 'Dialog'

export default Dialog
