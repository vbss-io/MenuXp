import { OperationStatus } from '@/domain/enums/operation/operation-status.enum'
import type { Operation } from '@/domain/models/operation.model'
import { ConfirmationDialog } from '@/presentation/components/entities/operations/confirmation-dialog'
import { Button } from '@menuxp/ui'
import { ClockIcon, PauseIcon, PlayIcon, StopIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface OperationStatusCardProps {
  operation: Operation | null
  isPausing?: boolean
  isResuming?: boolean
  isFinishing?: boolean
  onPause?: () => void
  onResume?: () => void
  onFinish?: () => void
}

const getStatusInfo = (status: OperationStatus | null) => {
  switch (status) {
    case OperationStatus.RUNNING:
      return {
        icon: <PlayIcon weight="fill" />,
        label: 'Em Andamento',
        color: '#22c55e',
        bgColor: '#dcfce7'
      }
    case OperationStatus.PAUSED:
      return {
        icon: <PauseIcon weight="fill" />,
        label: 'Pausada',
        color: '#f59e0b',
        bgColor: '#fef3c7'
      }
    case OperationStatus.FINISHED:
      return {
        icon: <StopIcon weight="fill" />,
        label: 'Finalizada',
        color: '#ef4444',
        bgColor: '#fee2e2'
      }
    default:
      return {
        icon: <ClockIcon />,
        label: 'Parada',
        color: '#6b7280',
        bgColor: '#f3f4f6'
      }
  }
}

export const OperationStatusCard = ({
  operation,
  isPausing = false,
  isResuming = false,
  isFinishing = false,
  onPause,
  onResume,
  onFinish
}: OperationStatusCardProps) => {
  const statusInfo = getStatusInfo(operation?.status || null)
  const startTime = operation?.createdAt ? new Date(operation.createdAt) : null
  const isRunning = operation?.status === OperationStatus.RUNNING
  const isPaused = operation?.status === OperationStatus.PAUSED
  const [elapsedTime, setElapsedTime] = useState('')
  const [showFinishDialog, setShowFinishDialog] = useState(false)

  useEffect(() => {
    if (!startTime || !isRunning) {
      setElapsedTime('')
      return
    }

    const updateTimer = () => {
      const now = new Date()
      const diff = now.getTime() - startTime.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setElapsedTime(`${hours}h ${minutes}m`)
      } else if (minutes > 0) {
        setElapsedTime(`${minutes}m ${seconds}s`)
      } else {
        setElapsedTime(`${seconds}s`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [startTime, isRunning])

  const getStatusDescription = () => {
    switch (operation?.status) {
      case OperationStatus.RUNNING:
        return 'Recebendo pedidos ativamente'
      case OperationStatus.PAUSED:
        return 'Pausada - Clientes não veem o cardápio'
      case OperationStatus.FINISHED:
        return 'Operação finalizada'
      default:
        return 'Operação parada'
    }
  }

  const handleFinishClick = () => {
    setShowFinishDialog(true)
  }

  const handleConfirmFinish = () => {
    onFinish?.()
    setShowFinishDialog(false)
  }

  return (
    <Container status={operation?.status || null}>
      <StatusColumn>
        <StatusIcon color={statusInfo.color} bgColor={statusInfo.bgColor}>
          {statusInfo.icon}
        </StatusIcon>
        <StatusInfo>
          <StatusLabel>
            {statusInfo.label}
            {operation?.status === OperationStatus.RUNNING && (
              <StatusDescriptionInline> • {getStatusDescription()}</StatusDescriptionInline>
            )}
          </StatusLabel>
          {operation?.status !== OperationStatus.RUNNING && (
            <StatusDescription>{getStatusDescription()}</StatusDescription>
          )}
          {startTime && (
            <StartTime>
              Iniciada em{' '}
              {startTime.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
              {isRunning && elapsedTime && <ElapsedTime> • {elapsedTime}</ElapsedTime>}
            </StartTime>
          )}
        </StatusInfo>
      </StatusColumn>

      <IdColumn>{operation && <OperationId>ID: {operation.id}</OperationId>}</IdColumn>

      <ActionsColumn>
        {(isRunning || isPaused) && (
          <ButtonsContainer>
            {isRunning && onPause && (
              <ActionButton
                onClick={onPause}
                loading={isPausing}
                loadingText="Pausando..."
                variant="secondary"
                size="sm"
                leftIcon={<PauseIcon weight="fill" />}
              >
                Pausar Operação
              </ActionButton>
            )}

            {isPaused && onResume && (
              <ActionButton
                onClick={onResume}
                loading={isResuming}
                loadingText="Retomando..."
                variant="primary"
                size="sm"
                leftIcon={<PlayIcon weight="fill" />}
              >
                Retomar Operação
              </ActionButton>
            )}

            {onFinish && (
              <ActionButton
                onClick={handleFinishClick}
                loading={isFinishing}
                loadingText="Encerrando..."
                variant="danger"
                size="sm"
                leftIcon={<StopIcon weight="fill" />}
              >
                Finalizar Operação
              </ActionButton>
            )}
          </ButtonsContainer>
        )}
      </ActionsColumn>

      <ConfirmationDialog
        isOpen={showFinishDialog}
        onClose={() => setShowFinishDialog(false)}
        onConfirm={handleConfirmFinish}
        title="Finalizar Operação?"
        description="Esta ação irá parar de receber pedidos e finalizar a operação atual. Você não poderá desfazer esta ação."
        confirmText="Sim, Finalizar"
        cancelText="Cancelar"
        variant="danger"
        isLoading={isFinishing}
      />
    </Container>
  )
}

const Container = styled.div<{ status: OperationStatus | null }>`
  background: ${({ theme, status }) => {
    switch (status) {
      case OperationStatus.RUNNING:
        return '#dcfce7' // Verde bem clarinho
      case OperationStatus.PAUSED:
        return '#fef3c7' // Laranja bem clarinho
      case OperationStatus.FINISHED:
        return '#fee2e2' // Vermelho bem clarinho
      default:
        return theme.colors.mx.white
    }
  }};
  border: 1px solid
    ${({ theme, status }) => {
      switch (status) {
        case OperationStatus.RUNNING:
          return '#22c55e' // Verde do ícone play
        case OperationStatus.PAUSED:
          return '#f59e0b' // Laranja do ícone pause
        case OperationStatus.FINISHED:
          return '#ef4444' // Vermelho do ícone stop
        default:
          return theme.colors.mx.black
      }
    }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 3px 3px 0px
    ${({ theme, status }) => {
      switch (status) {
        case OperationStatus.RUNNING:
          return '#22c55e' // Verde do ícone play
        case OperationStatus.PAUSED:
          return '#f59e0b' // Laranja do ícone pause
        case OperationStatus.FINISHED:
          return '#ef4444' // Vermelho do ícone stop
        default:
          return theme.colors.mx.black
      }
    }};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: start;
  padding-top: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }
`

const StatusColumn = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0; /* Permite que o conteúdo seja truncado se necessário */
  padding-top: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    padding-top: 0;
  }
`

const StatusIcon = styled.div<{ color: string; bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  flex-shrink: 0;
`

const StatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0; /* Permite que o conteúdo seja truncado se necessário */
  justify-content: flex-start;
`

const StatusLabel = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StatusDescription = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  font-style: italic;
`

const StatusDescriptionInline = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mx.black};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  text-transform: none;
  letter-spacing: normal;
`

const StartTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ElapsedTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.success}15;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: 1px solid ${({ theme }) => theme.colors.success}30;
`

const IdColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 768px) {
    order: -1; /* Move para cima no mobile */
    align-items: center;
    padding-top: 0;
  }
`

const ActionsColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    padding-top: 0;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
  }
`

const ActionButton = styled(Button)<{ variant?: string }>`
  min-width: 140px;
  height: 36px;

  /* Estilo específico para botão de encerrar */
  &.button.danger {
    background: ${({ theme }) => theme.colors.mx.white} !important;
    color: ${({ theme }) => theme.colors.error} !important;
    border: 1px solid ${({ theme }) => theme.colors.error} !important;

    &:hover {
      background: ${({ theme }) => theme.colors.error} !important;
      color: ${({ theme }) => theme.colors.mx.white} !important;
    }
  }

  @media (max-width: 640px) {
    width: 100%;
    min-width: unset;
  }
`

const OperationId = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  display: inline-block;
  white-space: nowrap;
`
