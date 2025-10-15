import styled from 'styled-components'

export const ViewContainer = styled.div`
  &.view-container {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

export const SectionTitle = styled.div`
  &.section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    svg {
      color: ${({ theme }) => theme.colors.mx.blue};
    }
  }
`

export const MenuItemsGrid = styled.div<{
  $isDragging?: boolean
}>`
  &.menu-items-grid {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    padding: ${({ theme }) => theme.spacing.sm} 0;
    scrollbar-width: none;
    cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
    user-select: none;
    gap: ${({ theme }) => theme.spacing.md};

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const LoadingContainer = styled.div`
  &.loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const EmptyStateContainer = styled.div`
  &.empty-state-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xl};
    text-align: center;
  }
`

export const EmptyStateDescription = styled.p`
  &.empty-state-description {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    line-height: 1.5;
  }
`
