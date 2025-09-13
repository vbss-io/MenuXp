import { Button } from '@/presentation/components/ui/button'
import { Dialog } from '@/presentation/components/ui/dialog'
import { Play, Warning } from '@phosphor-icons/react'
import styled from 'styled-components'

interface StartOperationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export const StartOperationDialog = ({ isOpen, onClose, onConfirm, isLoading = false }: StartOperationDialogProps) => {
  return (
    <Dialog
      title="Iniciar Operação"
      description="Confirme o início da operação do restaurante"
      open={isOpen}
      onOpenChange={onClose}
      variant="outline"
      disableTextColor
      style={{ width: '90%', maxWidth: '500px' }}
      footer={
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={isLoading}
            onClick={onConfirm}
            loading={isLoading}
            loadingText="Iniciando..."
            leftIcon={<Play weight="fill" />}
          >
            Iniciar Operação
          </Button>
        </DialogFooter>
      }
    >
      <DialogContent>
        <WarningSection>
          <WarningIcon>
            <Warning weight="fill" />
          </WarningIcon>
          <WarningText>
            <WarningTitle>Atenção!</WarningTitle>
            <WarningDescription>
              Ao iniciar a operação, seu restaurante estará disponível para receber pedidos. Certifique-se de que está
              preparado para atender os clientes.
            </WarningDescription>
          </WarningText>
        </WarningSection>
        <InfoSection>
          <InfoTitle>O que acontece quando você inicia:</InfoTitle>
          <InfoList>
            <InfoItem>• Seu restaurante ficará visível para clientes</InfoItem>
            <InfoItem>• Você começará a receber pedidos</InfoItem>
            <InfoItem>• Os KPIs serão monitorados automaticamente</InfoItem>
            <InfoItem>• Você pode pausar ou encerrar a qualquer momento</InfoItem>
          </InfoList>
        </InfoSection>
      </DialogContent>
    </Dialog>
  )
}

const DialogFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const WarningSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: #fef3c7;
  border: 2px solid #f59e0b;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const WarningIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: #f59e0b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  flex-shrink: 0;
  margin-top: 2px;
`

const WarningText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const WarningTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: #92400e;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const WarningDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: #92400e;
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const InfoTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
`

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const InfoItem = styled.li`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`
