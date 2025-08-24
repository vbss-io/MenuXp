import {
  GetOperationStatisticsUsecase,
  type OperationStatistics
} from '@/application/operations/get-operation-statistics.usecase'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from './use-auth'

const getOperationStatisticsUsecase = new GetOperationStatisticsUsecase()

export const useOperationKPIs = (operationId?: string) => {
  const { restaurantId } = useAuth()
  const [statistics, setStatistics] = useState<OperationStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchStatistics = useCallback(async () => {
    if (!restaurantId || !operationId) return
    try {
      setIsLoading(true)
      const data = await getOperationStatisticsUsecase.execute({
        restaurantId,
        operationId
      })
      setStatistics(data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      toast.error('Erro ao carregar estatísticas da operação')
    } finally {
      setIsLoading(false)
    }
  }, [restaurantId, operationId])

  useEffect(() => {
    if (operationId) {
      fetchStatistics()
    }
  }, [operationId, fetchStatistics])

  return {
    kpis: statistics
      ? {
          dailyOrders: statistics.dailyOrders,
          averagePreparationTime: statistics.averagePreparationTime,
          cancellations: statistics.cancellations,
          dailyRevenue: statistics.dailyRevenue,
          sentForDelivery: statistics.sentForDelivery,
          delivered: statistics.delivered
        }
      : null,
    ordersByStatus: statistics?.ordersByStatus || [],
    isLoading,
    refreshStatistics: fetchStatistics
  }
}
