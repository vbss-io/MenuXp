import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetOperationStatisticsQuery } from '@restaurants/application/operations/@queries/get-operation-statistics.query'
import { GetOperationStatisticsType } from '@restaurants/application/operations/get-operation-statistics/get-operation-statistics.schema'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetOperationStatisticsUsecaseInput = GetOperationStatisticsType & {
  userId: string
}

export interface OperationStatistics {
  dailyOrders: number
  averagePreparationTime: number
  cancellations: number
  dailyRevenue: number
  sentForDelivery: number
  delivered: number
  ordersByStatus: {
    status: OrderStatus
    count: number
    color: string
  }[]
}

export class GetOperationStatisticsUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository
  @inject('GetOperationStatisticsQuery')
  private readonly GetOperationStatisticsQuery!: GetOperationStatisticsQuery

  async execute({
    userId,
    restaurantId,
    operationId
  }: GetOperationStatisticsUsecaseInput): Promise<OperationStatistics> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to get operation statistics')
    const statistics = await this.GetOperationStatisticsQuery.execute({
      restaurantId,
      operationId
    })
    return statistics
  }
}
