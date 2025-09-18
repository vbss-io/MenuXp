import { useState } from 'react'

import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'

import * as S from './styles'

export const ReportsPage = () => {
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
      </S.Header>
      <S.Content>
        <S.PlaceholderCard>
          <S.PlaceholderTitle>Relatórios</S.PlaceholderTitle>
          <S.PlaceholderDescription>
            Funcionalidade em desenvolvimento. Em breve você poderá visualizar relatórios detalhados sobre o desempenho
            do seu restaurante.
          </S.PlaceholderDescription>
        </S.PlaceholderCard>
      </S.Content>
    </S.Container>
  )
}
