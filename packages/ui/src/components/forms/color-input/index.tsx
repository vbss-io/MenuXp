import React from 'react'

import * as S from './styles'

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
    <S.Container>
      <S.Label htmlFor={id}>
        {label} {required && '*'}
      </S.Label>
      <S.InputContainer>
        <S.ColorPreview $color={value || placeholder} onClick={() => document.getElementById(`${id}Picker`)?.click()} />
        <S.HiddenColorInput id={`${id}Picker`} type="color" value={value || placeholder} onChange={handleColorChange} />
        <S.HexInput type="text" placeholder={placeholder} value={value} onChange={handleHexChange} />
      </S.InputContainer>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  )
}
