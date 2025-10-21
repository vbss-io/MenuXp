import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@menuxp/ui'
import { ChartBarIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import * as S from '../styles'

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
      <S.Content>
        <S.EmptyState>
          <S.EmptyStateIcon>
            <ChartBarIcon size={48} />
          </S.EmptyStateIcon>
          <S.EmptyStateTitle>Relatórios</S.EmptyStateTitle>
          <S.EmptyStateDescription>
            Funcionalidade em desenvolvimento. Em breve você poderá visualizar relatórios detalhados sobre o desempenho
            do seu restaurante.
          </S.EmptyStateDescription>
        </S.EmptyState>
      </S.Content>
    </S.Container>
  )
}
