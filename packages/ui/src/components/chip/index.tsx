import React from 'react'

import { useLayout } from '@menuxp/ui'
import * as S from './styles'

interface ChipProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
}

export const Chip: React.FC<ChipProps> = ({ children, variant = 'primary', size = 'md', className, style }) => {
  const { layout } = useLayout()

  const classes = ['chip', variant, size, `layout-${layout}`, className].filter(Boolean).join(' ')

  return (
    <S.ChipContainer className={classes} style={style}>
      {children}
    </S.ChipContainer>
  )
}

Chip.displayName = 'Chip'
