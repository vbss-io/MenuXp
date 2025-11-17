import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { ResumeOperationType } from '@restaurants/application/operations/resume-operation/resume-operation.schema'
import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ResumeOperationUsecaseInput = ResumeOperationType & {
  userId: string
}

export class ResumeOperationUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  async execute({ userId, operationId }: ResumeOperationUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const operation = await this.OperationRepository.findById(operationId)
    if (!operation) throw new NotFoundError('Operation', operationId)
    const restaurant = await this.RestaurantRepository.findById(operation.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', operation.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to resume operation')
    if (operation.status !== OperationStatus.PAUSED) throw new ConflictError('Operation is not paused')
    operation.start()
    await this.OperationRepository.update({ id: operationId }, operation)
  }
}
