import styled from 'styled-components'

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SearchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.breakpoints.xl} {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

export const PopoverContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 200px;
`

export const PopoverTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const PopoverOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const PopoverOption = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  background: ${({ active, theme }) => (active ? theme.colors.mx.red : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.colors.mx.white : theme.colors.mx.black)};

  &:hover {
    background: ${({ active, theme }) => (active ? theme.colors.mx.red : theme.colors.mx.gray[100])};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`
