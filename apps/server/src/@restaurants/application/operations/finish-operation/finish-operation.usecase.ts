import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { FinishOperationType } from '@restaurants/application/operations/finish-operation/finish-operation.schema'
import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type FinishOperationUsecaseInput = FinishOperationType & {
  userId: string
}

export class FinishOperationUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  async execute(input: FinishOperationUsecaseInput): Promise<void> {
    const { userId, operationId } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const operation = await this.OperationRepository.findById(operationId)
    if (!operation) throw new NotFoundError('Operation', operationId)
    const restaurant = await this.RestaurantRepository.findById(operation.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', operation.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to finish operation')
    if (operation.status === OperationStatus.FINISHED) throw new ConflictError('Operation already finished')
    operation.finish()
    await this.OperationRepository.update({ id: operationId }, operation)
  }
}
