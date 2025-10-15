import React from 'react'

import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

interface ClientPreviewIframeProps {
  className?: string
}

export const ClientPreviewIframe: React.FC<ClientPreviewIframeProps> = ({ className }) => {
  const { restaurant } = useRestaurant()

  if (!restaurant?.slug) {
    return (
      <S.ErrorContainer className={className}>
        <S.ErrorMessage>
          <S.ErrorIcon>⚠️</S.ErrorIcon>
          <div>
            <S.ErrorTitle>Slug do restaurante não encontrado</S.ErrorTitle>
            <S.ErrorDescription>
              O restaurante precisa ter um slug configurado para visualizar o cardápio do cliente.
            </S.ErrorDescription>
          </div>
        </S.ErrorMessage>
      </S.ErrorContainer>
    )
  }

  const clientUrl = `${import.meta.env.VITE_CLIENT_FRONTEND}/${restaurant.slug}`

  return (
    <S.IframeContainer className={className}>
      <S.IframeHeader>
        <S.IframeTitle>Visualização do Cliente</S.IframeTitle>
        <S.IframeUrl>{clientUrl}</S.IframeUrl>
      </S.IframeHeader>
      <S.IframeWrapper>
        <iframe
          src={clientUrl}
          title={`Cardápio do ${restaurant.name}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </S.IframeWrapper>
    </S.IframeContainer>
  )
}
