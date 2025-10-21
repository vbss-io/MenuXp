import React from 'react'

import * as S from './styles'

interface FormTimeInputProps {
  id: string
  label: string
  placeholder?: string
  error?: string
  required?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  min?: string
  max?: string
  step?: number
}



export const FormTimeInput: React.FC<FormTimeInputProps> = ({
  id,
  label,
  placeholder,
  error,
  required = false,
  register,
  value,
  onChange,
  disabled = false,
  min,
  max,
  step = 900,
  ...rest
}) => {
  return (
    <S.Container>
      <S.Label htmlFor={id}>
        {label} {required && '*'}
      </S.Label>
      <S.TimeInput
        type="time"
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        $hasError={!!error}
        {...(register || { value, onChange, ...rest })}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  )
}
