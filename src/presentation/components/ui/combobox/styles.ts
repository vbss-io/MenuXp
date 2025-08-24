import styled from 'styled-components'

export const ComboboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  position: relative;
`

export const ComboboxWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

export const Input = styled.input`
  width: 100%;
  height: 2.25rem;
  padding: 0.5rem 0.75rem;
  margin-top: 0.375rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: #000000;
  background: #ffffff;
  transition: border-color 0.2s ease;
  padding-right: ${({ theme }) => theme.spacing.xl};

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #3b82f620;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #f3f4f6;
  }
`

export const IconButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  color: ${({ theme }) => theme.colors.mx.black};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.mx.red}10;
    color: ${({ theme }) => theme.colors.mx.red};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 2px;
`

export const Option = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.red}10;
    color: ${({ theme }) => theme.colors.mx.red};
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.white};
  }

  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.brutalist};
    border-top-right-radius: ${({ theme }) => theme.borderRadius.brutalist};
  }

  &:last-child {
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.brutalist};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.brutalist};
    border-bottom: none;
  }
`

export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const LoadingMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: #6b7280;
  text-align: center;
  font-style: italic;
`

export const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: #6b7280;
  text-align: center;
  font-style: italic;
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
`
