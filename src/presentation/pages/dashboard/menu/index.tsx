import { useState } from 'react'

import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'

import * as S from './styles'

export const MenuPage = () => {
  const [isLoading, _setIsLoading] = useState(false)

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <Breadcrumb lastPath="Cardápio" />
      <S.Header>
        <S.Title>Cardápio</S.Title>
        <S.Subtitle>Gerencie o cardápio do seu restaurante</S.Subtitle>
      </S.Header>
    </S.Container>
  )
}
