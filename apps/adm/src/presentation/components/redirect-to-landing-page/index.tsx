import { useEffect } from 'react'

import * as S from './styles'

interface RedirectToLandingPageProps {
  clientUrl?: string
}

export const RedirectToLandingPage = ({ clientUrl }: RedirectToLandingPageProps) => {
  useEffect(() => {
    const url = clientUrl || import.meta.env.VITE_CLIENT_FRONTEND || 'http://localhost:3001'
    window.location.href = url
  }, [clientUrl])

  const handleManualRedirect = () => {
    const url = clientUrl || import.meta.env.VITE_CLIENT_FRONTEND || 'http://localhost:3001'
    window.location.href = url
  }

  return (
    <S.Container>
      <S.Content>
        <S.Logo src="/images/menuxp-logo.svg" alt="MenuXP" />
        <S.Title>Redirecionando para o MenuXP...</S.Title>
        <S.LoadingContainer>
          <S.Spinner />
          <S.LoadingText>Redirecionando...</S.LoadingText>
        </S.LoadingContainer>
        <S.ManualRedirectContainer>
          <S.ManualRedirectText>Se você não for redirecionado automaticamente,</S.ManualRedirectText>
          <S.ManualRedirectButton onClick={handleManualRedirect}>clique aqui</S.ManualRedirectButton>
        </S.ManualRedirectContainer>
      </S.Content>
    </S.Container>
  )
}
