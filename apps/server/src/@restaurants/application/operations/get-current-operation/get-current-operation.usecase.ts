import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetCurrentOperationQuery } from '@restaurants/application/operations/@queries/get-current-operation.query'
import { GetCurrentOperationType } from '@restaurants/application/operations/get-current-operation/get-current-operation.schema'
import { Operation } from '@restaurants/domain/operations/operation.entity'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetCurrentOperationUsecaseInput = GetCurrentOperationType & {
  userId: string
}

export class GetCurrentOperationUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('GetCurrentOperationQuery')
  private readonly GetCurrentOperationQuery!: GetCurrentOperationQuery

  async execute({ userId, restaurantId }: GetCurrentOperationUsecaseInput): Promise<Operation | null> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to get current operation')
    const operation = await this.GetCurrentOperationQuery.execute({ restaurantId })
    return operation
  }
}
