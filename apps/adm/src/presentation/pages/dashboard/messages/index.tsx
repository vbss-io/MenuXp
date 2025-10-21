import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@menuxp/ui'
import { useState } from 'react'

import { ChatIcon } from '@phosphor-icons/react'
import * as S from '../styles'

export const MessagesPage = () => {
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
      <Breadcrumb lastPath="Mensagens" />
      <S.Content>
        <S.EmptyState>
          <S.EmptyStateIcon>
            <ChatIcon size={48} />
          </S.EmptyStateIcon>
          <S.EmptyStateTitle>Mensagens</S.EmptyStateTitle>
          <S.EmptyStateDescription>
            Funcionalidade em desenvolvimento. Em breve você poderá gerenciar todas as mensagens do seu restaurante.
          </S.EmptyStateDescription>
        </S.EmptyState>
      </S.Content>
    </S.Container>
  )
}
