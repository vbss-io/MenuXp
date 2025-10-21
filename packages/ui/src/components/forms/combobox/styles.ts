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
  &.combobox-label {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

export const Input = styled.input`
  &.combobox-input {
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
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: #f3f4f6;
    }
  }
`

export const IconButton = styled.button`
  &.combobox-icon-button {
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
      background-color: rgba(0, 0, 0, 0.1);
      color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`

export const Dropdown = styled.div`
  &.combobox-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.mx.white};
    border: 2px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 16px;
    box-shadow: 4px 6px 0 #000000;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 2px;
  }
`

export const Option = styled.div`
  &.combobox-option {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    color: ${({ theme }) => theme.colors.mx.black};
    transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
    border-bottom: 1px solid #e5e7eb;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: ${({ theme }) => theme.colors.primary};
    }

    &.selected {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.mx.white};
    }

    &:first-child {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    &:last-child {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      border-bottom: none;
    }
  }
`

export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const LoadingMessage = styled.div`
  &.combobox-loading {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    color: #6b7280;
    text-align: center;
    font-style: italic;
  }
`

export const EmptyMessage = styled.div`
  &.combobox-empty {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    color: #6b7280;
    text-align: center;
    font-style: italic;
  }
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
`
