import React from 'react'

import { ClientForm } from '@/components/client/client-form'

import * as S from '../../styles'

export const ClientFormShowcase: React.FC = () => {
  const handleSuccess = () => {
    console.log('Authentication successful!')
  }

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Client Form</S.Label>
        <ClientForm initialMode="login" onSuccess={handleSuccess} />
      </S.ShowcaseItem>
    </S.ShowcaseContainer>
  )
}

export default ClientFormShowcase
