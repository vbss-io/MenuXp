import { Button, Popover } from '@menuxp/ui'
import React from 'react'

import * as S from '../../styles'

export const PopoverShowcase: React.FC = () => {
  const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const

  return (
    <S.ShowcaseGrid>
      {variants.map((variant) => (
        <S.ShowcaseItem key={variant}>
          <S.Label>{variant}</S.Label>
          <Popover variant={variant} trigger={<Button variant={variant}>{variant}</Button>}>
            <div>
              <h3>Popover {variant}</h3>
              <p>Este é um popover com variante {variant}.</p>
              <p>Ele se adapta automaticamente ao layout atual.</p>
            </div>
          </Popover>
        </S.ShowcaseItem>
      ))}
    </S.ShowcaseGrid>
  )
}
