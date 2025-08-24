import { useState } from 'react'

import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'

import * as S from './styles'

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
      <Breadcrumb lastPath="Missões" />
      <S.Header>
        <S.Subtitle>Gerencie as missões do seu restaurante</S.Subtitle>
      </S.Header>
      <S.Content>
        <S.PlaceholderCard>
          <S.PlaceholderTitle>Missões</S.PlaceholderTitle>
          <S.PlaceholderDescription>
            Funcionalidade em desenvolvimento. Em breve você poderá gerenciar todas as missões e gamificação do seu
            restaurante.
          </S.PlaceholderDescription>
        </S.PlaceholderCard>
      </S.Content>
    </S.Container>
  )
}
