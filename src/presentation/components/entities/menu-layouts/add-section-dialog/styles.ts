import styled from 'styled-components'

export const DialogContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  max-height: 60vh;
`

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`
