import { inject } from '@api/infra/dependency-injection/registry'
import { CreateNotificationUsecase } from '@restaurants/application/notifications/create-notification/create-notification.usecase'
import { NotificationType } from '@restaurants/domain/notifications/enums/notification-type.enum'
import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import type { OrderCreatedData } from '@restaurants/domain/orders/events/order-created.event'

type OrderCreatedListenerInput = OrderCreatedData

export class OrderCreatedListener {
  @inject('CreateNotificationUsecase')
  private readonly CreateNotificationUsecase!: CreateNotificationUsecase

  async execute(data: OrderCreatedListenerInput): Promise<void> {
    const title = data.isScheduled ? 'Novo Pedido Agendado!' : 'Novo Pedido Recebido!'
    const scheduleInfo = data.scheduledFor ? ` para ${new Date(data.scheduledFor).toLocaleString('pt-BR')}` : ''
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
}
