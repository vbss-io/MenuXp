import type { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'
import { WhatsAppTemplateKey } from '@restaurants/application/notifications/@types/whatsapp-templates.type'
import type { SendWhatsAppNotificationUsecase } from '@restaurants/application/whatsapp-notifications/send-whatsapp-notification/send-whatsapp-notification.usecase'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import type { OrderStatusChanged } from '@restaurants/domain/orders/events/order-status-changed.event'
import { NotificationEventType } from '@restaurants/domain/whatsapp-notifications/whatsapp-notification-log.schema'
import type { OrderRepository } from '@restaurants/infra/repositories/orders.repository'
import type { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

const STATUS_TO_TEMPLATE_MAP: Record<OrderStatus, WhatsAppTemplateKey | null> = {
  [OrderStatus.SCHEDULED]: null,
  [OrderStatus.RECEIVED]: WhatsAppTemplateKey.ORDER_RECEIVED,
  [OrderStatus.CONFIRMED]: WhatsAppTemplateKey.ORDER_CONFIRMED,
  [OrderStatus.IN_PRODUCTION]: WhatsAppTemplateKey.ORDER_IN_PREPARATION,
  [OrderStatus.READY]: WhatsAppTemplateKey.ORDER_READY,
  [OrderStatus.SENT_FOR_DELIVERY]: WhatsAppTemplateKey.ORDER_OUT_FOR_DELIVERY,
  [OrderStatus.DELIVERED]: WhatsAppTemplateKey.ORDER_DELIVERED,
  [OrderStatus.CANCELLED]: WhatsAppTemplateKey.ORDER_CANCELLED
}

export class WhatsAppOrderStatusChangedListener {
  @inject('SendWhatsAppNotificationUsecase')
  private readonly sendWhatsAppNotificationUsecase!: SendWhatsAppNotificationUsecase

  @inject('RestaurantRepository')
  private readonly restaurantRepository!: RestaurantRepository

  @inject('CustomerUserRepository')
  private readonly customerUserRepository!: CustomerUserRepository

  @inject('OrderRepository')
  private readonly orderRepository!: OrderRepository

  @inject('Logger')
  private readonly logger!: Logger

  async execute(eventData: OrderStatusChanged['data']): Promise<void> {
    try {
      const templateKey = STATUS_TO_TEMPLATE_MAP[eventData.newStatus]
      if (!templateKey) {
        this.logger.info('No WhatsApp template configured for status', {
          orderId: eventData.orderId,
          status: eventData.newStatus
        })
        return
      }
      const restaurant = await this.restaurantRepository.findById(eventData.restaurantId)
      if (!restaurant) {
        this.logger.warn('Restaurant not found for WhatsApp status notification', {
          restaurantId: eventData.restaurantId,
          orderId: eventData.orderId
        })
        return
      }
      const customer = await this.customerUserRepository.findById(eventData.customerId)
      if (!customer) {
        this.logger.warn('Customer not found for WhatsApp status notification', {
          customerId: eventData.customerId,
          orderId: eventData.orderId
        })
        return
      }
      const order = await this.orderRepository.findById(eventData.orderId)
      if (!order) {
        this.logger.warn('Order not found for WhatsApp status notification', {
          orderId: eventData.orderId
        })
        return
      }
      await this.sendWhatsAppNotificationUsecase.execute(
        {
          orderId: eventData.orderId,
          orderCode: eventData.orderCode,
          restaurantId: eventData.restaurantId,
          customerPhone: customer.phone,
          customerLanguage: customer.preferredLanguage,
          event: NotificationEventType.ORDER_STATUS_CHANGED,
          templateKey,
          orderStatus: eventData.newStatus,
          cancelReason: eventData.cancelReason,
          scheduledFor: order.scheduledFor,
          total: order.total
        },
        restaurant
      )
    } catch (error) {
      this.logger.error('Error sending WhatsApp notification for status change', {
        orderId: eventData.orderId,
        orderCode: eventData.orderCode,
        oldStatus: eventData.oldStatus,
        newStatus: eventData.newStatus,
        customerId: eventData.customerId,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      throw error
    }
  }
}
