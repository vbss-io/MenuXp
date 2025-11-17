import { useState } from 'react'

import { ClientRegisterForm } from '@/components/client/client-form/client-register-form'

import * as S from '../../styles'

export const ClientRegisterFormShowcase: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('register')

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode)
  }

  const handleSuccess = () => {}

  return (
    <S.ShowcaseContainer>
      <S.Label>ClientRegisterForm</S.Label>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <ClientRegisterForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ClientRegisterForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ClientRegisterForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ClientRegisterForm mode={mode} onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
