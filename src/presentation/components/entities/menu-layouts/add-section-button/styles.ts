import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 3px dashed ${({ theme }) => theme.colors.mx.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  text-transform: uppercase;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}10`};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const PopoverContent = styled.div`
  min-width: 320px;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`

export const PopoverHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-right: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.red};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
`

export const HeaderTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.white};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
`

export const SectionsList = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE e Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari e Opera */
  }
`

export const SectionOption = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }

  &:active {
    background: ${({ theme }) => `${theme.colors.primary}20`};
    transform: translateX(2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const SectionName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: 0.2px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const SectionDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`
