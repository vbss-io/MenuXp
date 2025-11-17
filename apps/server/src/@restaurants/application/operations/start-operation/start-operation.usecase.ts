import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCurrentOperationQuery } from '@restaurants/application/operations/@queries/get-current-operation.query'
import { StartOperationType } from '@restaurants/application/operations/start-operation/start-operation.schema'
import { Operation } from '@restaurants/domain/operations/operation.entity'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type StartOperationUsecaseInput = StartOperationType & {
  userId: string
}

export class StartOperationUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  @inject('GetCurrentOperationQuery')
  private readonly GetCurrentOperationQuery!: GetCurrentOperationQuery

  async execute({ userId, restaurantId }: StartOperationUsecaseInput): Promise<Operation> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to start operation')
    const currentOperation = await this.GetCurrentOperationQuery.execute({ restaurantId })
    if (currentOperation) throw new ConflictError('Operation already exists')
    const operation = Operation.create({ restaurantId })
    return await this.OperationRepository.create(operation)
  }
}
