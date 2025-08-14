import styled from 'styled-components'

export const PopoverContent = styled.div`
  padding: 1rem;
  max-height: 400px;
  position: relative;
  pointer-events: auto;
`

export const PopoverTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.primary};
  pointer-events: auto;
`

export const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  max-height: 300px;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing.sm};
  pointer-events: auto;
`

export const IconButton = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 1px solid ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 0.5rem;
  background: ${({ selected, theme }) => (selected ? `${theme.colors.primary}20` : 'transparent')};
  color: ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.primary)};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.md};
  outline: none;
  position: relative;
  z-index: 1;
  pointer-events: auto;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => `${theme.colors.secondary}20`};
    color: ${({ theme }) => theme.colors.secondary};
    z-index: 2;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}40`};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: ${({ theme }) => theme.spacing.md};
    height: ${({ theme }) => theme.spacing.md};
  }
`
