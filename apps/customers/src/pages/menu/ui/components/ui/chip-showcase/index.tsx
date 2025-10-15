import React from 'react'

import { Chip } from '@/components/ui/chip'

import * as S from '../../styles'

export const ChipShowcase: React.FC = () => {
  const chipVariants = ['primary', 'secondary', 'outline', 'ghost'] as const

  return (
    <S.ShowcaseGrid>
      {chipVariants.map((variant) => (
        <S.ShowcaseItem key={variant}>
          <S.Label>{variant}</S.Label>
          <Chip variant={variant} size="md">
            {variant}
          </Chip>
        </S.ShowcaseItem>
      ))}
    </S.ShowcaseGrid>
  )
}
