import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'

export class Operation {
  status: OperationStatus

  private constructor(
    readonly id: string | undefined,
    readonly restaurantId: string,
    status: OperationStatus,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.status = status
  }

  static create(input: CreateOperation): Operation {
    return new Operation(undefined, input.restaurantId, OperationStatus.RUNNING)
  }

  static restore(input: RestoreOperation): Operation {
    return new Operation(input.id, input.restaurantId, input.status, input.createdAt, input.updatedAt)
  }

  start(): void {
    this.status = OperationStatus.RUNNING
  }

  pause(): void {
    this.status = OperationStatus.PAUSED
  }

  finish(): void {
    this.status = OperationStatus.FINISHED
  }
}

export interface CreateOperation {
  restaurantId: string
}

type RestoreOperation = CreateOperation & {
  id: string
  status: OperationStatus
  createdAt: Date
  updatedAt: Date
}
