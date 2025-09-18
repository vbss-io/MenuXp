import { Button } from '@/presentation/components/ui/button'
import { Dialog } from '@/presentation/components/ui/dialog'
import { WarningIcon, XIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText = 'Cancelar',
  variant = 'warning',
  isLoading = false
}: ConfirmationDialogProps) => {
  const getVariantColors = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: '#ef4444',
          bg: '#fee2e2',
          border: '#ef4444'
        }
      case 'warning':
        return {
          icon: '#f59e0b',
          bg: '#fef3c7',
          border: '#f59e0b'
        }
      case 'info':
        return {
          icon: '#3b82f6',
          bg: '#dbeafe',
          border: '#3b82f6'
        }
    }
  }

  const colors = getVariantColors()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      title=""
      style={{ width: '95%', maxWidth: '500px' }}
      footer={
        <DialogFooter>
          <CancelButton
            type="button"
            variant="ghost"
            size="lg"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </CancelButton>
          <ConfirmButton
            type="button"
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="lg"
            onClick={onConfirm}
            loading={isLoading}
            loadingText="Processando..."
          >
            {confirmText}
          </ConfirmButton>
        </DialogFooter>
      }
    >
      <DialogContent>
        <WarningSection>
          <WarningIconContainer color={colors.icon} bgColor={colors.bg}>
            <WarningIcon weight="fill" />
          </WarningIconContainer>
          <WarningText>
            <WarningTitle>{title}</WarningTitle>
            <WarningDescription>{description}</WarningDescription>
          </WarningText>
        </WarningSection>
      </DialogContent>
    </Dialog>
  )
}

const DialogContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const DialogFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md};
`

const WarningSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`

const WarningIconContainer = styled.div<{ color: string; bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  flex-shrink: 0;
  border: 1px solid ${({ color }) => color};
`

const WarningText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

const WarningTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const WarningDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

const CancelButton = styled(Button)`
  min-width: 120px;
`

const ConfirmButton = styled(Button)`
  min-width: 140px;
`
