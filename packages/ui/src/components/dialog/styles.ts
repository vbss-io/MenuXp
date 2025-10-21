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
    
    /* Estilos brutalistas base */
    border: 1px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: 4px 4px 0px ${({ theme }) => theme.colors.mx.black};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};

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
      margin: 0;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.lg};
    }

    
  }
`

export const SeparatorLine = styled.hr`
  border: none;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.mx.black};
  border-radius: 1px;
`
