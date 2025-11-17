import { Loading } from '@menuxp/ui'
import React from 'react'

import * as S from '../../styles'

export const LoadingShowcase: React.FC = () => {
  return (
    <S.ShowcaseGrid>
      <S.ShowcaseItem>
        <S.Label>Loading Padrão</S.Label>
        <Loading />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Loading Pequeno</S.Label>
        <Loading size={16} />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Loading Grande</S.Label>
        <Loading size={48} />
      </S.ShowcaseItem>
    </S.ShowcaseGrid>
  )
}
