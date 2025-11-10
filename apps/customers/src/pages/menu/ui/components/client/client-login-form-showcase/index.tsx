import { useState } from 'react'

import { ClientLoginForm } from '@/components/client/client-form/client-login-form'

import * as S from '../../styles'

export const ClientLoginFormShowcase: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode)
    console.log('Mode changed to:', newMode)
  }

  const handleSuccess = () => {
    console.log('Login successful!')
  }

  return (
    <S.ShowcaseContainer>
      <S.Label>ClientLoginForm</S.Label>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <ClientLoginForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ClientLoginForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ClientLoginForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ClientLoginForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
