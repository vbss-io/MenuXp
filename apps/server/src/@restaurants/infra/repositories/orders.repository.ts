import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import type { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { Order } from '@restaurants/domain/orders/orders.entity'
import { type OrderDocument, OrderModel } from '@restaurants/domain/orders/orders.schema'
import type { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import type { PaymentMethod } from '@restaurants/domain/restaurants/enums/payment-methods.enum'

export interface OrderRepository<T = unknown> extends BaseRepository<T, Order> {
  toDomain(order: T): Order
}

export class OrderRepositoryMongoose
  extends BaseRepositoryMongoose<OrderDocument, Order>
  implements OrderRepository<OrderDocument>
{
  constructor(model = OrderModel) {
    super(model)
  }

  toDomain(entity: OrderDocument): Order {
    return Order.restore({
      id: entity._id.toString(),
      restaurantId: entity.restaurantId,
      operationId: entity.operationId,
      clientId: entity.clientId,
      status: entity.status as OrderStatus,
      subtotal: entity.subtotal,
      deliveryFee: entity.deliveryFee,
      total: entity.total,
      customer: entity.customer,
      orderType: entity.orderType as OperationType,
      paymentMethod: entity.paymentMethod as PaymentMethod,
      items: entity.items,
      code: entity.code,
      isScheduled: entity.isScheduled,
      scheduledFor: entity.scheduledFor,
      cancelReason: entity.cancelReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
