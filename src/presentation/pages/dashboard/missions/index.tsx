import { useState } from 'react'

import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'

import * as S from './styles'

// To-Do: Update Styles
export const MissionsPage = () => {
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
      <Breadcrumb lastPath="Relatórios" />
      <S.Header>
        <S.Title>Missões</S.Title>
        <S.Subtitle>Gerencie as missões do seu restaurante</S.Subtitle>
      </S.Header>
    </S.Container>
  )
}
