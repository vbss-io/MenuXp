import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  > div:not(:last-child) {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: row;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing.lg};

    > div:not(:last-child) {
      flex: 1;
      min-width: 0;
    }
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

export const ActionsRowButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  > * {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: row;
    width: auto;
    flex-shrink: 0;

    > * {
      width: auto;
    }
  }

  .popoverTrigger {
    width: 100%;

    @media ${({ theme }) => theme.breakpoints.lg} {
      width: auto;
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const CouponsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media not ${({ theme }) => theme.breakpoints.xl} {
    grid-template-columns: 1fr;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  text-align: center;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  gap: ${({ theme }) => theme.spacing.md};
`

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.mx.gray[400]};
`

export const EmptyStateTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
`

export const EmptyStateText = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`
