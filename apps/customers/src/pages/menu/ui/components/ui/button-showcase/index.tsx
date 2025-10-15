import React from 'react'

import { Button } from '@/components/ui/button'

import * as S from '../../styles'

export const ButtonShowcase: React.FC = () => {
  const buttonVariants = ['primary', 'secondary', 'outline', 'game', 'danger', 'white', 'ghost'] as const

  return (
    <S.ShowcaseGrid>
      {buttonVariants.map((variant) => (
        <S.ShowcaseItem key={variant}>
          <S.Label>{variant}</S.Label>
          <Button variant={variant} size="md">
            {variant}
          </Button>
        </S.ShowcaseItem>
      ))}
    </S.ShowcaseGrid>
  )
}
