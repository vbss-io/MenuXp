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

export const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`

export const PopoverContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 200px;
`

export const PopoverTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
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
  background: ${({ active, theme }) => (active ? `${theme.colors.primary}10` : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.text)};

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}05`};
  }
`
