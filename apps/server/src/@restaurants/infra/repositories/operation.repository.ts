import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import type { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { Operation } from '@restaurants/domain/operations/operation.entity'
import { type OperationDocument, OperationModel } from '@restaurants/domain/operations/operation.schema'

export interface OperationRepository<T = unknown> extends BaseRepository<T, Operation> {
  toDomain(operation: T): Operation
}

export class OperationRepositoryMongoose
  extends BaseRepositoryMongoose<OperationDocument, Operation>
  implements OperationRepository<OperationDocument>
{
  constructor(model = OperationModel) {
    super(model)
  }

  toDomain(entity: OperationDocument): Operation {
    return Operation.restore({
      id: entity._id.toString(),
      restaurantId: entity.restaurantId,
      status: entity.status as OperationStatus,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
