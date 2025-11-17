import type { DomainEvent } from '@api/infra/events/domain-event'

import { ORDER_CREATED } from '@restaurants/domain/orders/consts/order-events.const'
import type { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'

export interface OrderCreatedData {
  orderId: string
  orderCode: string
  restaurantId: string
  customerId: string
  customerName: string
  total: number
  isScheduled: boolean
  scheduledFor?: Date
  status: OrderStatus
}

export class OrderCreated implements DomainEvent<OrderCreatedData> {
  eventName = ORDER_CREATED.eventName

  constructor(readonly data: OrderCreatedData) {}
}
