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
  letter-spacing: 0.05em;
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
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  cursor: pointer;
  transition: background-color 0.2s ease;
  background: ${({ active, theme }) => (active ? `${theme.colors.mx.red}10` : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.colors.mx.red : theme.colors.mx.black)};

  &:hover {
    background: ${({ theme }) => `${theme.colors.mx.red}05`};
  }
`
