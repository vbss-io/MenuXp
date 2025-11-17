import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type {
  GetReportsDataQuery,
  ReportsDatasetOutput
} from '@restaurants/application/reports/@queries/get-reports-data.query'
import type { GetReportsDataType } from '@restaurants/application/reports/get-reports-data/get-reports-data.schema'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetReportsDataUsecaseInput = GetReportsDataType & {
  userId: string
}

export class GetReportsDataUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('GetReportsDataQuery')
  private readonly GetReportsDataQuery!: GetReportsDataQuery

  @inject('Logger')
  private readonly Logger!: Logger

  async execute({ userId, filters, sections }: GetReportsDataUsecaseInput): Promise<ReportsDatasetOutput> {
    const startTime = Date.now()
    try {
      const user = await this.UserRepository.findById(userId)
      if (!user) throw new NotFoundError('User', userId)
      const restaurant = await this.RestaurantRepository.findById(filters.restaurantId)
      if (!restaurant) throw new NotFoundError('Restaurant', filters.restaurantId)
      if (!restaurant.hasPermission(userId)) {
        throw new ForbiddenError('User does not have permission to view reports for this restaurant')
      }
      this.Logger.info('Generating reports data', {
        userId,
        restaurantId: filters.restaurantId,
        dateRange: filters.dateRange,
        sections: sections || 'all',
        granularity: filters.chartGranularity
      })
      const result = await this.GetReportsDataQuery.execute(filters, sections)
      const duration = Date.now() - startTime
      this.Logger.info('Reports data generated successfully', {
        userId,
        restaurantId: filters.restaurantId,
        durationMs: duration,
        totalOrders: result.summary.totalOrders,
        totalRevenue: result.summary.totalRevenue
      })
      return result
    } catch (error) {
      const duration = Date.now() - startTime
      this.Logger.error('Failed to generate reports data', {
        userId,
        restaurantId: filters.restaurantId,
        durationMs: duration,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      throw error
    }
  }
}
