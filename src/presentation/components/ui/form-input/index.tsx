import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
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
  status?: 'success' | 'error' | 'idle'
  rightAdornment?: React.ReactNode
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
  status = 'idle',
  rightAdornment,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false)

  // support both RHF register and controlled
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRegister: any = register ? register : { value, onChange, ...rest }

  // Calculate border color to avoid nested ternary
  const getBorderColor = () => {
    if (error) return '#DC2626'
    if (isFocused) return '#000000'
    return undefined
  }
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    inputRegister?.onFocus?.(e)
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    inputRegister?.onBlur?.(e)
  }

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
      <div style={{ position: 'relative', height: 44 }}>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          fontSize={fontSize}
          {...inputRegister}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            paddingRight: rightAdornment || status !== 'idle' ? '44px' : undefined,
            borderColor: getBorderColor(),
            height: 44,
            lineHeight: '44px'
          }}
        />
        {rightAdornment ? (
          <div
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              color: isFocused ? '#000000' : '#E5E7EB'
            }}
          >
            {rightAdornment}
          </div>
        ) : (
          status !== 'idle' && (
            <div
              aria-hidden
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                color: status === 'success' ? '#16A34A' : '#DC2626'
              }}
            >
              {status === 'success' ? (
                <CheckCircleIcon size={20} weight="fill" />
              ) : (
                <XCircleIcon size={20} weight="fill" />
              )}
            </div>
          )
        )}
      </div>
      <div style={{ minHeight: '18px', lineHeight: '18px', paddingTop: '4px' }}>
        {error && (
          <span style={{ fontSize: '12px', color: '#DC2626', fontFamily: 'Inter, system-ui, sans-serif' }}>
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
