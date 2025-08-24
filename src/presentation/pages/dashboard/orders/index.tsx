import { useState } from 'react'

import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/@to-do/components/ui/loading'

import * as S from './styles'

export const OrdersPage = () => {
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
      <Breadcrumb lastPath="Pedidos" />
      <S.Header>
        <S.Subtitle>Gerencie os pedidos do seu restaurante</S.Subtitle>
      </S.Header>
      <S.Content>
        <S.PlaceholderCard>
          <S.PlaceholderTitle>Pedidos</S.PlaceholderTitle>
          <S.PlaceholderDescription>
            Funcionalidade em desenvolvimento. Em breve você poderá gerenciar todos os pedidos do seu restaurante.
          </S.PlaceholderDescription>
        </S.PlaceholderCard>
      </S.Content>
    </S.Container>
  )
}
