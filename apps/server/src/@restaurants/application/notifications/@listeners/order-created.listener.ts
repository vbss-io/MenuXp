import { inject } from '@api/infra/dependency-injection/registry'
import { CreateNotificationUsecase } from '@restaurants/application/notifications/create-notification/create-notification.usecase'
import { NotificationType } from '@restaurants/domain/notifications/enums/notification-type.enum'
import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import type { OrderCreatedData } from '@restaurants/domain/orders/events/order-created.event'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

type OrderCreatedListenerInput = OrderCreatedData

export class OrderCreatedListener {
  @inject('CreateNotificationUsecase')
  private readonly CreateNotificationUsecase!: CreateNotificationUsecase

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute(data: OrderCreatedListenerInput): Promise<void> {
    const title = data.isScheduled ? 'Novo Pedido Agendado!' : 'Novo Pedido Recebido!'
    const scheduleInfo = data.scheduledFor ? ` para ${new Date(data.scheduledFor).toLocaleString('pt-BR')}` : ''
    await this.createCustomerNotification(data)
    await this.CreateNotificationUsecase.execute({
      type: NotificationType.ORDER,
      recipientType: RecipientType.RESTAURANT,
      recipientId: data.restaurantId,
      title,
      message: `Pedido #${data.orderCode} de ${data.customerName} - R$ ${data.total.toFixed(2)}${scheduleInfo}`,
      metadata: {
        orderId: data.orderId,
        orderCode: data.orderCode,
        customerId: data.customerId,
        customerName: data.customerName,
        total: data.total,
        isScheduled: data.isScheduled,
        scheduledFor: data.scheduledFor
      }
    })
  }

  private async createCustomerNotification(data: OrderCreatedListenerInput): Promise<void> {
    const restaurant = await this.RestaurantRepository.findById(data.restaurantId)
    if (!restaurant) return
    const templateKey = data.isScheduled ? 'order_scheduled' : 'order_received'
    const template = restaurant.settings?.templates?.[templateKey]
    if (!template) return
    const message = this.replaceTemplateVariables(template, {
      order_id: data.orderCode,
      scheduled_for: data.scheduledFor ? new Date(data.scheduledFor).toLocaleString('pt-BR') : ''
    })
    await this.CreateNotificationUsecase.execute({
      type: NotificationType.ORDER,
      recipientType: RecipientType.CUSTOMER,
      recipientId: data.customerId,
      title: 'Pedido Recebido',
      message,
      metadata: {
        orderId: data.orderId,
        orderCode: data.orderCode,
      }
    })
  }

  private replaceTemplateVariables(template: string, variables: Record<string, string>): string {
    let result = template
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`#{${key}}`, 'g'), value)
    }
    return result
  }
}
