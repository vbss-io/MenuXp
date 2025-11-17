import { Loading } from '@menuxp/ui'
import { MedalIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'

import * as S from '../styles'

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
      <S.Content>
        <S.EmptyState>
          <S.EmptyStateIcon>
            <MedalIcon size={48} />
          </S.EmptyStateIcon>
          <S.EmptyStateTitle>Missões</S.EmptyStateTitle>
          <S.EmptyStateDescription>
            Funcionalidade em desenvolvimento. Em breve você poderá gerenciar todas as missões e gamificação do seu
            estabelecimento.
          </S.EmptyStateDescription>
        </S.EmptyState>
      </S.Content>
    </S.Container>
  )
}
