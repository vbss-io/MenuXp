import type { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'
import { WhatsAppTemplateKey } from '@restaurants/application/notifications/@types/whatsapp-templates.type'
import type { SendWhatsAppNotificationUsecase } from '@restaurants/application/whatsapp-notifications/send-whatsapp-notification/send-whatsapp-notification.usecase'
import type { OrderCreated } from '@restaurants/domain/orders/events/order-created.event'
import { NotificationEventType } from '@restaurants/domain/whatsapp-notifications/whatsapp-notification-log.schema'
import type { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export class WhatsAppOrderCreatedListener {
  @inject('SendWhatsAppNotificationUsecase')
  private readonly sendWhatsAppNotificationUsecase!: SendWhatsAppNotificationUsecase

  @inject('RestaurantRepository')
  private readonly restaurantRepository!: RestaurantRepository

  @inject('CustomerUserRepository')
  private readonly customerUserRepository!: CustomerUserRepository

  @inject('Logger')
  private readonly logger!: Logger

  async execute(eventData: OrderCreated['data']): Promise<void> {
    try {
      const restaurant = await this.restaurantRepository.findById(eventData.restaurantId)
      if (!restaurant) {
        this.logger.warn('Restaurant not found for WhatsApp order notification', {
          restaurantId: eventData.restaurantId,
          orderId: eventData.orderId
        })
        return
      }
      const customer = await this.customerUserRepository.findById(eventData.customerId)
      if (!customer) {
        this.logger.warn('Customer not found for WhatsApp order notification', {
          customerId: eventData.customerId,
          orderId: eventData.orderId
        })
        return
      }
      const templateKey = eventData.isScheduled ? WhatsAppTemplateKey.ORDER_SCHEDULED : WhatsAppTemplateKey.ORDER_RECEIVED
      await this.sendWhatsAppNotificationUsecase.execute(
        {
          orderId: eventData.orderId,
          orderCode: eventData.orderCode,
          restaurantId: eventData.restaurantId,
          customerPhone: customer.phone,
          customerLanguage: customer.preferredLanguage,
          event: NotificationEventType.ORDER_CREATED,
          templateKey,
          total: eventData.total,
          scheduledFor: eventData.scheduledFor
        },
        restaurant
      )
    } catch (error) {
      this.logger.error('Error sending WhatsApp notification for order created', {
        orderId: eventData.orderId,
        orderCode: eventData.orderCode,
        customerId: eventData.customerId,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      throw error
    }
  }
}
