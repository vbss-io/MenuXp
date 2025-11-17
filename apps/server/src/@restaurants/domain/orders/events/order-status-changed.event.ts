import type { DomainEvent } from '@api/infra/events/domain-event'

import { ORDER_STATUS_CHANGED } from '@restaurants/domain/orders/consts/order-events.const'
import type { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'

export interface OrderStatusChangedData {
  orderId: string
  orderCode: string
  restaurantId: string
  customerId: string
  customerName: string
  oldStatus: OrderStatus
  newStatus: OrderStatus
  cancelReason?: string
}

export class OrderStatusChanged implements DomainEvent<OrderStatusChangedData> {
  eventName = ORDER_STATUS_CHANGED.eventName

  constructor(readonly data: OrderStatusChangedData) {}
}
