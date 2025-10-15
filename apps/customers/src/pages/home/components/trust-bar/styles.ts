import styled from 'styled-components'

export const TrustBarSection = styled.section`
  background-color: ${({ theme }) => theme.colors.mx.red};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  width: 100%;
  overflow-x: hidden;
`

export const TrustBarContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

export const TrustItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.lg} {
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const TrustIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.mx.black};
`

export const TrustText = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.mx.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  white-space: nowrap;

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`
