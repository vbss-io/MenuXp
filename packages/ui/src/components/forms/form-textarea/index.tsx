import { useLayout } from '@menuxp/ui'
import { Textarea } from '@vbss-ui/textarea'
import React from 'react'

import * as S from './styles'

interface FormTextareaProps {
  id: string
  label: string
  placeholder?: string
  error?: string
  required?: boolean
  register?: any
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rows?: number
  disabled?: boolean
  className?: string
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  placeholder,
  error,
  required: _required = false,
  register,
  value,
  onChange,
  fontSize = 'sm',
  rows = 3,
  disabled = false,
  className
}) => {
  const { layout } = useLayout()

  const classes = ['form-textarea', `layout-${layout}`, className].filter(Boolean).join(' ')

  return (
    <S.StyledTextareaContainer className={classes}>
      <Textarea
        id={id}
        label={label}
        error={error}
        placeholder={placeholder}
        fontSize={fontSize}
        rows={rows}
        disabled={disabled}
        {...(register || { value, onChange })}
      />
    </S.StyledTextareaContainer>
  )
}

FormTextarea.displayName = 'FormTextarea'
