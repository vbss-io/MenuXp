import { OperationStatus } from '@/domain/enums/operation/operation-status.enum'
import { OperationCharts } from '@/presentation/components/entities/operations/operation-charts'
import { OperationControls } from '@/presentation/components/entities/operations/operation-controls'
import { OperationKPIs } from '@/presentation/components/entities/operations/operation-kpis'
import { OperationStatusCard } from '@/presentation/components/entities/operations/operation-status-card'
import { StartOperationDialog } from '@/presentation/components/entities/operations/start-operation-dialog'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'
import { useOperation } from '@/presentation/hooks/use-operation'
import { useOperationKPIs } from '@/presentation/hooks/use-operation-kpis'
import { useState } from 'react'
import styled from 'styled-components'

export const OperationPage = () => {
  const {
    operation,
    isLoading: isOperationLoading,
    isStarting,
    isPausing,
    isResuming,
    isFinishing,
    startOperation,
    pauseOperation,
    resumeOperation,
    finishOperation
  } = useOperation()

  const { kpis, ordersByStatus, isLoading: isKPIsLoading } = useOperationKPIs(operation?.id)
  const [showStartDialog, setShowStartDialog] = useState(false)

  const handleStartOperation = () => {
    setShowStartDialog(true)
  }

  const handleConfirmStart = async () => {
    await startOperation()
    setShowStartDialog(false)
  }

  const handleCancelStart = () => {
    setShowStartDialog(false)
  }

  if (isOperationLoading) {
    return (
      <Container>
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      </Container>
    )
  }

  const isActive = operation?.status === OperationStatus.RUNNING
  const isPaused = operation?.status === OperationStatus.PAUSED
  const shouldShowMetrics = isActive || isPaused

  return (
    <Container>
      <Breadcrumb lastPath="Operação" />
      <Header>
        <Subtitle>Gerencie a operação do seu restaurante</Subtitle>
      </Header>
      <Content>
        <OperationStatusCard operation={operation} />
        <OperationControls
          operation={operation}
          isStarting={isStarting}
          isPausing={isPausing}
          isResuming={isResuming}
          isFinishing={isFinishing}
          onStart={handleStartOperation}
          onPause={pauseOperation}
          onResume={resumeOperation}
          onFinish={finishOperation}
        />
        {shouldShowMetrics && kpis && (
          <>
            <OperationKPIs kpis={kpis} isLoading={isKPIsLoading} />
            <OperationCharts ordersByStatus={ordersByStatus} isLoading={isKPIsLoading} />
          </>
        )}
      </Content>
      <StartOperationDialog
        isOpen={showStartDialog}
        onClose={handleCancelStart}
        onConfirm={handleConfirmStart}
        isLoading={isStarting}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`
