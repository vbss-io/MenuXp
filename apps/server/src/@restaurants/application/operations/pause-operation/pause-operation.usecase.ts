import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { PauseOperationType } from '@restaurants/application/operations/pause-operation/pause-operation.schema'
import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type PauseOperationUsecaseInput = PauseOperationType & {
  userId: string
}

export class PauseOperationUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  async execute({ userId, operationId }: PauseOperationUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const operation = await this.OperationRepository.findById(operationId)
    if (!operation) throw new NotFoundError('Operation', operationId)
    const restaurant = await this.RestaurantRepository.findById(operation.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', operation.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to pause operation')
    if (operation.status !== OperationStatus.RUNNING) throw new ConflictError('Operation is not running')
    operation.pause()
    await this.OperationRepository.update({ id: operationId }, operation)
  }
}
