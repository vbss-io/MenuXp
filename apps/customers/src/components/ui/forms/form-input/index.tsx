import { useRestaurant } from '@/hooks/use-restaurant'
import { Input } from '@vbss-ui/input'
import React from 'react'

import * as S from './styles'

interface FormInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
  register?: any
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  [key: string]: any
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  required: _required = false,
  register,
  value,
  onChange,
  fontSize = 'sm',
  className,
  ...rest
}) => {
  const { layout } = useRestaurant()

  const classes = ['form-input', `layout-${layout}`, className].filter(Boolean).join(' ')

  return (
    <S.StyledInputContainer className={classes}>
      <Input
        id={id}
        label={label}
        type={type}
        error={error}
        placeholder={placeholder}
        fontSize={fontSize}
        {...(register ? register : { value, onChange, ...rest })}
      />
    </S.StyledInputContainer>
  )
}

FormInput.displayName = 'FormInput'
