import React from 'react'

import { Button } from '@menuxp/ui'
import { Tooltip } from '@menuxp/ui'

import * as S from '../../styles'

export const TooltipShowcase: React.FC = () => {
  const tooltipVariants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const

  return (
    <S.ShowcaseGrid>
      {tooltipVariants.map((variant) => (
        <S.ShowcaseItem key={variant}>
          <S.Label>{variant}</S.Label>
          <Tooltip
            variant={variant}
            trigger={
              <Button variant="primary" size="md">
                {variant}
              </Button>
            }
          >
            Tooltip {variant}
          </Tooltip>
        </S.ShowcaseItem>
      ))}
    </S.ShowcaseGrid>
  )
}
