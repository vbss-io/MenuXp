import { OperationStatus } from '@/domain/enums/operation/operation-status.enum'
import type { Operation } from '@/domain/models/operation.model'
import { Button } from '@menuxp/ui'
import { PauseIcon, PlayIcon, RocketLaunchIcon, StopIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

interface OperationControlsProps {
  operation: Operation | null
  isStarting: boolean
  isPausing: boolean
  isResuming: boolean
  isFinishing: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onFinish: () => void
}

export const OperationControls = ({
  operation,
  isStarting,
  isPausing,
  isResuming,
  isFinishing,
  onStart,
  onPause,
  onResume,
  onFinish
}: OperationControlsProps) => {
  const isRunning = operation?.status === OperationStatus.RUNNING
  const isPaused = operation?.status === OperationStatus.PAUSED

  if (!operation) {
    return (
      <Container>
        <StartSection>
          <StartInfo>
            <StartIconContainer>
              <RocketLaunchIcon weight="fill" />
            </StartIconContainer>
            <StartText>
              <StartTitle>Iniciar Operação</StartTitle>
              <StartDescription>
                Sua operação está parada. Clique no botão <strong>INICIAR OPERAÇÃO</strong> para começar a receber
                pedidos e gerenciar seu estabelecimento.
              </StartDescription>
            </StartText>
          </StartInfo>
          <StartButton
            onClick={onStart}
            loading={isStarting}
            loadingText="Iniciando..."
            leftIcon={<PlayIcon weight="fill" />}
            size="lg"
            variant="primary"
          >
            Iniciar Operação
          </StartButton>
        </StartSection>
      </Container>
    )
  }

  return (
    <Container>
      <ControlsSection>
        {isRunning && (
          <>
            <ControlButton
              onClick={onPause}
              loading={isPausing}
              loadingText="Pausando..."
              variant="secondary"
              leftIcon={<PauseIcon weight="fill" />}
            >
              Pausar Operação
            </ControlButton>
            <ControlButton
              onClick={onFinish}
              loading={isFinishing}
              loadingText="Encerrando..."
              variant="danger"
              leftIcon={<StopIcon weight="fill" />}
            >
              Encerrar Operação
            </ControlButton>
          </>
        )}

        {isPaused && (
          <>
            <ControlButton
              onClick={onResume}
              loading={isResuming}
              loadingText="Retomando..."
              variant="primary"
              leftIcon={<PlayIcon weight="fill" />}
            >
              Retomar Operação
            </ControlButton>
            <ControlButton
              onClick={onFinish}
              loading={isFinishing}
              loadingText="Encerrando..."
              variant="danger"
              leftIcon={<StopIcon weight="fill" />}
            >
              Encerrar Operação
            </ControlButton>
          </>
        )}
      </ControlsSection>
    </Container>
  )
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
`

const StartSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const StartInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const StartIconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: #dbeafe;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  flex-shrink: 0;
`

const StartText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StartTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StartDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

const StartButton = styled(Button)`
  flex-shrink: 0;
`

const ControlsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ControlButton = styled(Button)`
  min-width: 180px;
`
