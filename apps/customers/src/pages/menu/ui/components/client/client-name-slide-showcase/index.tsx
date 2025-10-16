import React, { useState } from 'react'

import { ClientNameSlide } from '@/components/client/client-name-slide'
import { Button } from '@menuxp/ui'

import * as S from '../../styles'

export const ClientNameSlideShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Client Name Slide</S.Label>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Abrir Slide de Nome
        </Button>
      </S.ShowcaseItem>
      <ClientNameSlide isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </S.ShowcaseContainer>
  )
}

ClientNameSlideShowcase.displayName = 'ClientNameSlideShowcase'

export default ClientNameSlideShowcase
