import { Button } from '@menuxp/ui'
import { Dialog } from '@/presentation/components/ui/dialog'
import { Play, Warning, CheckCircle, Clock, Users, ChartLine } from '@phosphor-icons/react'
import styled from 'styled-components'

interface StartOperationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

const StyledDialog = styled(Dialog)`
  &[data-state='open'] {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.mx.gray[400]} transparent;
    z-index: ${({ theme }) => theme.zIndex.modal + 100};

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.mx.gray[400]};
      border-radius: ${({ theme }) => theme.borderRadius.xs};
      
      &:hover {
        background: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
  
  /* Ajuste para mobile - garantir que o modal não seja sobreposto pelo header */
  @media (max-width: 768px) {
    &[data-state='open'] {
      margin-top: 0;
      max-height: calc(100vh - 84px);
      margin-bottom: 0;
      position: fixed !important;
      top: 84px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: 95% !important;
    }
  }
`

export const StartOperationDialog = ({ isOpen, onClose, onConfirm, isLoading = false }: StartOperationDialogProps) => {
  return (
    <StyledDialog
      title="🚀 Iniciar Operação"
      description="Prepare seu estabelecimento para receber pedidos e começar a faturar"
      open={isOpen}
      onOpenChange={onClose}
      variant="outline"
      disableTextColor
      style={{ width: '95%', maxWidth: '800px', maxHeight: '90vh' }}
      footer={
        <DialogFooter>
          <CancelButton 
            type="button" 
            variant="ghost" 
            size="lg"
            onClick={onClose} 
            disabled={isLoading}
            aria-label="Cancelar início da operação"
            style={{ display: 'inline-flex' }}
          >
            Cancelar
          </CancelButton>
          <Button
            type="button"
            variant="primary"
            size="lg"
            disabled={isLoading}
            onClick={onConfirm}
            loading={isLoading}
            loadingText="Iniciando operação..."
            leftIcon={<Play weight="fill" />}
            aria-label="Confirmar início da operação"
            style={{ display: 'inline-flex' }}
          >
            Iniciar Operação
          </Button>
        </DialogFooter>
      }
    >
      <DialogContent>
        <WarningSection role="alert" aria-live="polite">
          <WarningIcon aria-hidden="true">
            <Warning weight="fill" />
          </WarningIcon>
          <WarningText>
            <WarningTitle>Importante!</WarningTitle>
            <WarningDescription>
              Antes de iniciar, verifique se seu estabelecimento está preparado: cardápio atualizado, 
              estoque organizado e equipe pronta para atender.
            </WarningDescription>
          </WarningText>
        </WarningSection>
        
        <InfoSection>
          <InfoTitle>🎯 O que acontece quando você inicia:</InfoTitle>
          <InfoList role="list">
            <InfoItem>
              <InfoIcon aria-hidden="true">
                <Users weight="fill" />
              </InfoIcon>
              <InfoText>Seu estabelecimento ficará visível para clientes</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon aria-hidden="true">
                <CheckCircle weight="fill" />
              </InfoIcon>
              <InfoText>Você começará a receber pedidos em tempo real</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon aria-hidden="true">
                <ChartLine weight="fill" />
              </InfoIcon>
              <InfoText>KPIs e métricas serão monitorados automaticamente</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon aria-hidden="true">
                <Clock weight="fill" />
              </InfoIcon>
              <InfoText>Você pode pausar ou encerrar a qualquer momento</InfoText>
            </InfoItem>
          </InfoList>
        </InfoSection>

        <ReadySection>
          <ReadyTitle>✅ Pronto para começar?</ReadyTitle>
          <ReadyDescription>
            Clique em "Iniciar Operação" para ativar seu estabelecimento e começar a receber pedidos dos seus clientes.
          </ReadyDescription>
        </ReadySection>
      </DialogContent>
    </StyledDialog>
  )
}

const DialogFooter = styled.div`
  display: flex !important;
  flex-direction: row !important;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md} !important;
  align-items: center;
  width: 100%;
  
  button {
    min-width: 160px;
    height: 48px;
    flex-shrink: 0;
  }
  
  @media (max-width: 640px) {
    flex-direction: column-reverse !important;
    gap: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    
    /* Força container flexível igual */
    > * {
      width: 100% !important;
      flex: 1 1 auto !important;
      
      /* Força botão interno */
      button, .button {
        width: 100% !important;
        min-width: 0 !important;
        max-width: none !important;
        box-sizing: border-box !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
    }
  }
`

const CancelButton = styled(Button)`
  &.button.ghost {
    background: transparent;
    color: ${({ theme }) => theme.colors.mx.black};
    border: 1px solid ${({ theme }) => theme.colors.mx.black};
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
    
    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => theme.colors.error};
      transform: translateY(-2px);
      box-shadow: 0 4px 0 ${({ theme }) => theme.colors.error};
    }
  }
`

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const WarningSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.warning}15;
  border: 2px solid ${({ theme }) => theme.colors.warning};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  
  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    padding: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const WarningIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.mx.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  @media ${({ theme }) => theme.breakpoints.xs} {
    width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

const WarningText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  
  @media ${({ theme }) => theme.breakpoints.sm} {
    flex: 1;
    width: auto;
  }
`

const WarningTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media ${({ theme }) => theme.breakpoints.xs} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

const WarningDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const InfoTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media ${({ theme }) => theme.breakpoints.xs} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.ease};
  
  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
  
  @media ${({ theme }) => theme.breakpoints.xs} {
    padding: ${({ theme }) => theme.spacing.xs};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.mx.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  flex-shrink: 0;
  margin-top: 2px;
  
  @media ${({ theme }) => theme.breakpoints.xs} {
    width: 20px;
    height: 20px;
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }
`

const InfoText = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  flex: 1;
`

const ReadySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.success}15;
  border: 2px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  text-align: center;
  
  @media ${({ theme }) => theme.breakpoints.xs} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const ReadyTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media ${({ theme }) => theme.breakpoints.xs} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

const ReadyDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`
