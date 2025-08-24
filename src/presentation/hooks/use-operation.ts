import { FinishOperationUsecase } from '@/application/operations/finish-operation.usecase'
import { GetCurrentOperationUsecase } from '@/application/operations/get-current-operation.usecase'
import { PauseOperationUsecase } from '@/application/operations/pause-operation.usecase'
import { ResumeOperationUsecase } from '@/application/operations/resume-operation.usecase'
import { StartOperationUsecase } from '@/application/operations/start-operation.usecase'
import type { Operation } from '@/domain/models/operation.model'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from './use-auth'

const getCurrentOperationUsecase = new GetCurrentOperationUsecase()
const startOperationUsecase = new StartOperationUsecase()
const pauseOperationUsecase = new PauseOperationUsecase()
const resumeOperationUsecase = new ResumeOperationUsecase()
const finishOperationUsecase = new FinishOperationUsecase()

export const useOperation = () => {
  const { restaurantId } = useAuth()
  const [operation, setOperation] = useState<Operation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)
  const [isResuming, setIsResuming] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)

  const fetchOperation = useCallback(async () => {
    if (!restaurantId) return

    try {
      setIsLoading(true)
      const currentOperation = await getCurrentOperationUsecase.execute({ restaurantId })
      setOperation(currentOperation)
    } catch (error) {
      console.error('Erro ao buscar operação:', error)
      toast.error('Erro ao carregar operação atual')
    } finally {
      setIsLoading(false)
    }
  }, [restaurantId])

  const startOperation = useCallback(async () => {
    if (!restaurantId) return
    try {
      setIsStarting(true)
      await startOperationUsecase.execute({ restaurantId })
      await fetchOperation()
      toast.success('Operação iniciada com sucesso!')
    } catch (error) {
      console.error('Erro ao iniciar operação:', error)
      toast.error('Erro ao iniciar operação')
    } finally {
      setIsStarting(false)
    }
  }, [restaurantId, fetchOperation])

  const pauseOperation = useCallback(async () => {
    if (!operation?.id) return
    try {
      setIsPausing(true)
      await pauseOperationUsecase.execute({ operationId: operation.id })
      await fetchOperation()
      toast.success('Operação pausada com sucesso!')
    } catch (error) {
      console.error('Erro ao pausar operação:', error)
      toast.error('Erro ao pausar operação')
    } finally {
      setIsPausing(false)
    }
  }, [operation?.id, fetchOperation])

  const resumeOperation = useCallback(async () => {
    if (!operation?.id) return
    try {
      setIsResuming(true)
      await resumeOperationUsecase.execute({ operationId: operation.id })
      await fetchOperation()
      toast.success('Operação retomada com sucesso!')
    } catch (error) {
      console.error('Erro ao retomar operação:', error)
      toast.error('Erro ao retomar operação')
    } finally {
      setIsResuming(false)
    }
  }, [operation?.id, fetchOperation])

  const finishOperation = useCallback(async () => {
    if (!operation?.id) return
    try {
      setIsFinishing(true)
      await finishOperationUsecase.execute({ operationId: operation.id })
      await fetchOperation()
      toast.success('Operação encerrada com sucesso!')
    } catch (error) {
      console.error('Erro ao encerrar operação:', error)
      toast.error('Erro ao encerrar operação')
    } finally {
      setIsFinishing(false)
    }
  }, [operation?.id, fetchOperation])

  useEffect(() => {
    if (restaurantId) {
      fetchOperation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId])

  return {
    operation,
    isLoading,
    isStarting,
    isPausing,
    isResuming,
    isFinishing,
    startOperation,
    pauseOperation,
    resumeOperation,
    finishOperation,
    refreshOperation: fetchOperation
  }
}
