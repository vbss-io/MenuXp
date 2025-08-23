import { Input } from '@vbss-ui/input'
import React from 'react'

interface FormInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  required = false,
  register,
  value,
  onChange,
  fontSize = 'sm',
  ...rest
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label
        htmlFor={id}
        style={{
          fontSize: '14px',
          fontWeight: 700,
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {label} {required && '*'}
      </label>
      <Input
        type={type}
        error={error}
        placeholder={placeholder}
        fontSize={fontSize}
        {...(register || { id, value, onChange, ...rest })}
      />
    </div>
  )
}
