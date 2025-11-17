import { inject } from '@api/infra/dependency-injection/registry'

import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { Operation } from '@restaurants/domain/operations/operation.entity'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'

export interface GetCurrentOperationQueryInput {
  restaurantId: string
}

export type GetCurrentOperationQueryOutput = Operation | null

export class GetCurrentOperationQuery {
  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  async execute({ restaurantId }: GetCurrentOperationQueryInput): Promise<GetCurrentOperationQueryOutput> {
    const operations = await this.OperationRepository.find({
      restaurantId
    })
    if (!operations || operations.length === 0) return null
    const activeOperations = operations.filter(
      (op) => op.status === OperationStatus.RUNNING || op.status === OperationStatus.PAUSED
    )
    if (activeOperations.length === 0) return null
    return activeOperations.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })[0]
  }
}
