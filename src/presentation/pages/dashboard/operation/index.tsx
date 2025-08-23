import { useState } from 'react'

import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'

import * as S from './styles'

// To-Do: Update Styles
export const OperationPage = () => {
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
      <Breadcrumb lastPath="Operação" />
      <S.Header>
        <S.Title>Operação</S.Title>
        <S.Subtitle>Gerencie a operação do seu restaurante</S.Subtitle>
      </S.Header>
    </S.Container>
  )
}
