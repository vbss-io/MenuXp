import { BaseController } from '@api/application/@base.controller'
import { inject } from '@api/infra/dependency-injection/registry'
import { OrderCreatedListener } from '@restaurants/application/notifications/@listeners/order-created.listener'
import { OrderStatusChangedListener } from '@restaurants/application/notifications/@listeners/order-status-changed.listener'
import { WhatsAppOrderCreatedListener } from '@restaurants/application/notifications/@listeners/whatsapp-order-created.listener'
import { WhatsAppOrderStatusChangedListener } from '@restaurants/application/notifications/@listeners/whatsapp-order-status-changed.listener'
import { ORDER_CREATED, ORDER_STATUS_CHANGED } from '@restaurants/domain/orders/consts/order-events.const'
import { OrderCreatedData } from '@restaurants/domain/orders/events/order-created.event'
import { OrderStatusChangedData } from '@restaurants/domain/orders/events/order-status-changed.event'

export class NotificationListenersController extends BaseController {
  @inject('OrderCreatedListener')
  private readonly OrderCreatedListener!: OrderCreatedListener

  @inject('OrderStatusChangedListener')
  private readonly OrderStatusChangedListener!: OrderStatusChangedListener

  @inject('WhatsAppOrderCreatedListener')
  private readonly WhatsAppOrderCreatedListener!: WhatsAppOrderCreatedListener

  @inject('WhatsAppOrderStatusChangedListener')
  private readonly WhatsAppOrderStatusChangedListener!: WhatsAppOrderStatusChangedListener

  constructor() {
    super()

    void this.Queue.consume(ORDER_CREATED.consume, async (data: OrderCreatedData) => {
      await this.OrderCreatedListener.execute(data)
    })

    void this.Queue.consume(ORDER_STATUS_CHANGED.consume, async (data: OrderStatusChangedData) => {
      await this.OrderStatusChangedListener.execute(data)
    })

    void this.Queue.consume(`${ORDER_CREATED.consume}.whatsapp`, async (data: OrderCreatedData) => {
      await this.WhatsAppOrderCreatedListener.execute(data)
    })

    void this.Queue.consume(`${ORDER_STATUS_CHANGED.consume}.whatsapp`, async (data: OrderStatusChangedData) => {
      await this.WhatsAppOrderStatusChangedListener.execute(data)
    })
  }
}
