import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import * as S from './styles'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

const VARIANT_MAP = {
  danger: 'danger',
  warning: 'secondary',
  info: 'primary'
} as const

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger'
}: ConfirmationDialogProps) => {
  const buttonVariant = VARIANT_MAP[variant]

  return (
    <Dialog open={isOpen} onOpenChange={onClose} title={title}>
      <S.Description>{description}</S.Description>
      <S.Actions>
        <Button variant="outline" size="md" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant={buttonVariant} size="md" onClick={onConfirm}>
          {confirmText}
        </Button>
      </S.Actions>
    </Dialog>
  )
}

ConfirmationDialog.displayName = 'ConfirmationDialog'
