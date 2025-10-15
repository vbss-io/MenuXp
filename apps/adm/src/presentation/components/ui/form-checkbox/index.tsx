import { Checkbox } from '@vbss-ui/checkbox'
import React from 'react'

interface FormCheckboxProps {
  id: string
  label: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fontWeight?: 'thin' | 'light' | 'normal' | 'medium' | 'bold' | 'extrabold'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  label,
  checked = false,
  onCheckedChange,
  disabled = false,
  fontSize = 'sm',
  fontWeight = 'normal',
  variant = 'primary',
  size = 'sm',
  rounded = 'md',
  icon,
  className,
  style
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Checkbox
        id={id}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label={label as any}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        fontSize={fontSize}
        fontWeight={fontWeight}
        variant={variant}
        size={size}
        rounded={rounded}
        icon={icon}
        className={className}
        style={style}
      />
    </div>
  )
}
