import { Button as VbssButton } from '@vbss-ui/button'
import React from 'react'

import { useRestaurant } from '@/hooks/use-restaurant'
import * as S from './styles'

export type ButtonVariant = 'primary' | 'secondary' | 'white' | 'game' | 'outline' | 'ghost' | 'danger'
export type ButtonState = 'default' | 'loading' | 'success' | 'error'

export type ButtonProps = Omit<React.ComponentProps<typeof VbssButton>, 'variant'> & {
  variant?: ButtonVariant
  state?: ButtonState
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  loadingText?: string
  children?: React.ReactNode
  container?: string
}

export const Button = ({
  container,
  as = 'button',
  href,
  variant = 'primary',
  size = 'md',
  state = 'default',
  leftIcon,
  rightIcon,
  loading = false,
  loadingText,
  children,
  disabled,
  rounded = 'lg',
  ...props
}: ButtonProps) => {
  const { loading: _, ...restProps } = props
  const { layout } = useRestaurant()
  const isDisabled = disabled || loading || state === 'loading'
  const isLoading = loading || state === 'loading'

  const buttonClass = variant ? variant : 'primary'
  const sizeClass = size !== 'md' ? size : ''

  return (
    <S.ButtonContainer className={container}>
      <VbssButton
        {...restProps}
        as={as}
        href={href}
        rounded={rounded}
        fontSize={restProps.fontSize ?? 'sm'}
        size={size}
        disabled={isDisabled}
        className={`button ${buttonClass} ${sizeClass} layout-${layout} ${restProps.className ? restProps.className : ''}`}
      >
        {isLoading && (
          <S.LoadingContent>
            <S.LoadingSpinner />
            {loadingText && <span>{loadingText}</span>}
          </S.LoadingContent>
        )}
        <S.ButtonContent $loading={isLoading}>
          {leftIcon && <span>{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span>{rightIcon}</span>}
        </S.ButtonContent>
      </VbssButton>
    </S.ButtonContainer>
  )
}

Button.displayName = 'Button'

export default Button
