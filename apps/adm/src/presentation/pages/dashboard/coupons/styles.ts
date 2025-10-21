import styled from 'styled-components'

export const CouponsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media not ${({ theme }) => theme.breakpoints.xl} {
    grid-template-columns: 1fr;
  }
`
