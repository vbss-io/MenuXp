import React from 'react'
import styled from 'styled-components'

interface ColorInputProps {
  id: string
  label: string
  value?: string
  placeholder?: string
  error?: string
  onChange: (value: string) => void
  required?: boolean
}

export const ColorInput: React.FC<ColorInputProps> = ({
  id,
  label,
  value = '',
  placeholder = '#000000',
  error,
  onChange,
  required = false
}) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <Container>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <InputContainer>
        <ColorPreview $color={value || placeholder} onClick={() => document.getElementById(`${id}Picker`)?.click()} />
        <HiddenColorInput id={`${id}Picker`} type="color" value={value || placeholder} onChange={handleColorChange} />
        <HexInput type="text" placeholder={placeholder} value={value} onChange={handleHexChange} />
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

const ColorPreview = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

const HiddenColorInput = styled.input`
  display: none;
`

const HexInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  color: ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  text-transform: uppercase;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mx.gray[400]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.blue}20;
  }
`

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`
