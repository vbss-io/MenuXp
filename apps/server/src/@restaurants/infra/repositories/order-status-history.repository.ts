import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import type { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { OrderStatusHistory } from '@restaurants/domain/orders/order-status-history.entity'
import {
  type OrderStatusHistoryDocument,
  OrderStatusHistoryModel
} from '@restaurants/domain/orders/order-status-history.schema'
import type { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'

export interface OrderStatusHistoryRepository<T = unknown> extends BaseRepository<T, OrderStatusHistory> {
  toDomain(orderStatusHistory: T): OrderStatusHistory
}

export class OrderStatusHistoryRepositoryMongoose
  extends BaseRepositoryMongoose<OrderStatusHistoryDocument, OrderStatusHistory>
  implements OrderStatusHistoryRepository<OrderStatusHistoryDocument>
{
  constructor(model = OrderStatusHistoryModel) {
    super(model)
  }

  toDomain(entity: OrderStatusHistoryDocument): OrderStatusHistory {
    return OrderStatusHistory.restore({
      id: entity._id.toString(),
      orderId: entity.orderId,
      restaurantId: entity.restaurantId,
      status: entity.status as OrderStatus,
      changedAt: entity.changedAt,
      operationType: entity.operationType as OperationType | undefined
    })
  }
}
