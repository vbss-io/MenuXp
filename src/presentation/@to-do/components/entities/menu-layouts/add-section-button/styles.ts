import { Button } from '@vbss-ui/button'
import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`

export const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px dashed ${({ theme }) => theme.colors.gray};
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const PopoverContent = styled.div`
  min-width: 280px;
`

export const PopoverHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  h4 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const SectionsList = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
`

export const SectionOption = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray}10;
  }

  &:active {
    background: ${({ theme }) => theme.colors.gray}20;
  }
`

export const SectionName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const SectionDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`
