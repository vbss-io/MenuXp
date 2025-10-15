import { inject } from '@api/infra/dependency-injection/registry'
import { CreateNotificationUsecase } from '@restaurants/application/notifications/create-notification/create-notification.usecase'
import { NotificationType } from '@restaurants/domain/notifications/enums/notification-type.enum'
import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import type { OrderStatusChangedData } from '@restaurants/domain/orders/events/order-status-changed.event'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

type OrderStatusChangedListenerInput = OrderStatusChangedData

export class OrderStatusChangedListener {
  @inject('CreateNotificationUsecase')
  private readonly CreateNotificationUsecase!: CreateNotificationUsecase

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute(data: OrderStatusChangedListenerInput): Promise<void> {
    await this.createCustomerNotification(data)
  }

  private async createCustomerNotification(data: OrderStatusChangedListenerInput): Promise<void> {
    const importantStatuses = [
      OrderStatus.CONFIRMED,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.READY,
      OrderStatus.SENT_FOR_DELIVERY,
      OrderStatus.DELIVERED,
      OrderStatus.CANCELLED
    ]
    if (!importantStatuses.includes(data.newStatus)) {
      return
    }
    const restaurant = await this.RestaurantRepository.findById(data.restaurantId)
    if (!restaurant) return
    const templateKeys: Partial<Record<OrderStatus, string>> = {
      [OrderStatus.RECEIVED]: 'order_received',
      [OrderStatus.CONFIRMED]: 'order_confirmed',
      [OrderStatus.IN_PRODUCTION]: 'order_in_production',
      [OrderStatus.READY]: 'order_ready',
      [OrderStatus.SENT_FOR_DELIVERY]: 'order_out_for_delivery',
      [OrderStatus.DELIVERED]: 'order_delivered',
      [OrderStatus.CANCELLED]: 'order_canceled'
    }
    const templateKey = templateKeys[data.newStatus]
    if (!templateKey) return
    const template = restaurant.settings?.templates?.[templateKey]
    if (!template) return
    const message = this.replaceTemplateVariables(template, {
      order_id: data.orderCode,
      cancel_reason: data.cancelReason ?? 'Não especificado'
    })
    const statusTitles: Record<OrderStatus, string> = {
      [OrderStatus.SCHEDULED]: 'Pedido Agendado',
      [OrderStatus.RECEIVED]: 'Pedido Recebido',
      [OrderStatus.CONFIRMED]: 'Pedido Confirmado',
      [OrderStatus.IN_PRODUCTION]: 'Pedido em Produção',
      [OrderStatus.READY]: 'Pedido Pronto!',
      [OrderStatus.SENT_FOR_DELIVERY]: 'Pedido a Caminho',
      [OrderStatus.DELIVERED]: 'Pedido Entregue',
      [OrderStatus.CANCELLED]: 'Pedido Cancelado'
    }
    await this.CreateNotificationUsecase.execute({
      type: NotificationType.ORDER,
      recipientType: RecipientType.CUSTOMER,
      recipientId: data.customerId,
      title: statusTitles[data.newStatus],
      message,
      metadata: {
        orderId: data.orderId,
        orderCode: data.orderCode,
        oldStatus: data.oldStatus,
        newStatus: data.newStatus
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
