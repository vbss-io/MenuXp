import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface OperationStatistics {
  dailyOrders: number
  averagePreparationTime: number
  cancellations: number
  dailyRevenue: number
  sentForDelivery: number
  delivered: number
  ordersByStatus: {
    status: string
    count: number
    color: string
  }[]
}

export interface GetOperationStatisticsUsecaseInput {
  restaurantId: string
  operationId: string
}

export type GetOperationStatisticsUsecaseOutput = OperationStatistics

export class GetOperationStatisticsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/operation/:operationId/statistics`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetOperationStatisticsUsecaseInput): Promise<GetOperationStatisticsUsecaseOutput> {
    const response = await this.httpClient.get<OperationStatistics>({
      url: this.url.replace(':operationId', params.operationId),
      params: {
        restaurantId: params.restaurantId
      }
    })
    return response.data
  }
}
