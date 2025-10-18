import { Textarea } from '@vbss-ui/textarea'
import React from 'react'

interface FormTextareaProps {
  id: string
  label: string
  placeholder?: string
  error?: string
  required?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rows?: number
  disabled?: boolean
  maxLength?: number
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  placeholder,
  error,
  required = false,
  register,
  value,
  onChange,
  fontSize = 'sm',
  rows = 3,
  disabled = false,
  maxLength
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label
        htmlFor={id}
        style={{
          fontSize: '14px',
          fontWeight: 700,
          fontFamily: 'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          color: '#000000',
          letterSpacing: '0.2px'
        }}
      >
        {label} {required && '*'}
      </label>
      <Textarea
        error={error}
        placeholder={placeholder}
        fontSize={fontSize}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        {...(register || { id, value, onChange })}
      />
    </div>
  )
}
