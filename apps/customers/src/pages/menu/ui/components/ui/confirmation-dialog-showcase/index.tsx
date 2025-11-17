import { Button, ConfirmationDialog } from '@menuxp/ui'
import React, { useState } from 'react'

import * as S from '../../styles'

export const ConfirmationDialogShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [variant, setVariant] = useState<'danger' | 'warning' | 'info'>('danger')

  const handleConfirm = () => {
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <S.ShowcaseGrid>
      <S.ShowcaseItem>
        <S.Label>Confirmation Dialog</S.Label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <Button variant={variant === 'danger' ? 'primary' : 'outline'} size="sm" onClick={() => setVariant('danger')}>
            Danger
          </Button>
          <Button
            variant={variant === 'warning' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setVariant('warning')}
          >
            Warning
          </Button>
          <Button variant={variant === 'info' ? 'primary' : 'outline'} size="sm" onClick={() => setVariant('info')}>
            Info
          </Button>
        </div>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Abrir Confirmation Dialog
        </Button>
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="Confirmar Ação"
          description={`Tem certeza que deseja continuar? Esta ação é do tipo ${variant}.`}
          confirmText="Sim, continuar"
          cancelText="Cancelar"
          variant={variant}
        />
      </S.ShowcaseItem>
    </S.ShowcaseGrid>
  )
}
