import { OperationStatus } from '@/domain/enums/operation/operation-status.enum'
import { OperationCharts } from '@/presentation/components/entities/operations/operation-charts'
import { OperationControls } from '@/presentation/components/entities/operations/operation-controls'
import { OperationKPIs } from '@/presentation/components/entities/operations/operation-kpis'
import { OperationStatusCard } from '@/presentation/components/entities/operations/operation-status-card'
import { StartOperationDialog } from '@/presentation/components/entities/operations/start-operation-dialog'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { useOperation } from '@/presentation/hooks/use-operation'
import { Loading } from '@menuxp/ui'
import { useState } from 'react'

import * as S from '../styles'

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
    finishOperation,
    kpis,
    ordersByStatus,
    isStatisticsLoading: isKPIsLoading
  } = useOperation()

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
      <S.Container>
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </S.Container>
    )
  }

  const isActive = operation?.status === OperationStatus.RUNNING
  const isPaused = operation?.status === OperationStatus.PAUSED
  const shouldShowMetrics = isActive || isPaused

  return (
    <S.Container>
      <Breadcrumb lastPath="Operação" />
      <S.Content>
        {operation && (
          <OperationStatusCard
            operation={operation}
            isPausing={isPausing}
            isResuming={isResuming}
            isFinishing={isFinishing}
            onPause={pauseOperation}
            onResume={resumeOperation}
            onFinish={finishOperation}
          />
        )}
        {!operation && (
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
        )}
        {shouldShowMetrics && kpis && (
          <>
            <OperationKPIs kpis={kpis} isLoading={isKPIsLoading} />
            <OperationCharts ordersByStatus={ordersByStatus} isLoading={isKPIsLoading} />
          </>
        )}
      </S.Content>
      <StartOperationDialog
        isOpen={showStartDialog}
        onClose={handleCancelStart}
        onConfirm={handleConfirmStart}
        isLoading={isStarting}
      />
    </S.Container>
  )
}
