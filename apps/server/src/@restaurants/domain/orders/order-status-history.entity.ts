import type { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import type { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'

export class OrderStatusHistory {
  private constructor(
    readonly id: string | undefined,
    readonly orderId: string,
    readonly restaurantId: string,
    readonly status: OrderStatus,
    readonly changedAt: Date,
    readonly operationType?: OperationType
  ) {}

  static create(input: CreateOrderStatusHistory): OrderStatusHistory {
    return new OrderStatusHistory(
      undefined,
      input.orderId,
      input.restaurantId,
      input.status,
      new Date(),
      input.operationType
    )
  }

  static restore(input: RestoreOrderStatusHistory): OrderStatusHistory {
    return new OrderStatusHistory(
      input.id,
      input.orderId,
      input.restaurantId,
      input.status,
      input.changedAt,
      input.operationType
    )
  }
}

export interface CreateOrderStatusHistory {
  orderId: string
  restaurantId: string
  status: OrderStatus
  operationType?: OperationType
}

type RestoreOrderStatusHistory = CreateOrderStatusHistory & {
  id: string
  changedAt: Date
}
