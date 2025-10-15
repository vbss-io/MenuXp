import { Dialog as VbssDialog } from '@vbss-ui/dialog'
import styled from 'styled-components'

export const StyledDialog = styled(VbssDialog)`
  &[data-state='open'].dialog {
    background-color: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.mx.black};
    padding: ${({ theme }) => theme.spacing.lg};
    max-width: 80vw;
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
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
