import React, { useState } from 'react'

import { Button } from '@menuxp/ui'
import { Dialog } from '@menuxp/ui'

import * as S from '../../styles'

export const DialogShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <S.ShowcaseGrid>
      <S.ShowcaseItem>
        <S.Label>Dialog</S.Label>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Abrir Dialog
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen} title="Exemplo de Dialog">
          <p>
            Este é um exemplo de dialog customizado com o layout. O dialog agora suporta todos os layouts disponíveis e
            usa as cores do restaurante.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Confirmar
            </Button>
          </div>
        </Dialog>
      </S.ShowcaseItem>
    </S.ShowcaseGrid>
  )
}
