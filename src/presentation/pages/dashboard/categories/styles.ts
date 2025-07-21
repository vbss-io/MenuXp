import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
`

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;

  > div:first-child {
    flex: 1;
  }
`

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  text-align: center;
`

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.5;
`

export const EmptyStateTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

export const EmptyStateText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0;
  line-height: 1.5;
`
