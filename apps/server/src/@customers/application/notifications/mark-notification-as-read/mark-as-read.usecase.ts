import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import type { MarkCustomerNotificationAsReadType } from '@customers/application/notifications/mark-notification-as-read/mark-as-read.schema'
import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import { NotificationRepository } from '@restaurants/infra/repositories/notifications.repository'

export class MarkCustomerNotificationAsReadUsecase {
  @inject('NotificationRepository')
  private readonly NotificationRepository!: NotificationRepository

  async execute({ customerId, notificationId }: MarkCustomerNotificationAsReadType): Promise<void> {
    const notification = await this.NotificationRepository.findById(notificationId)
    if (!notification) throw new NotFoundError('Notification', notificationId)
    if (notification.recipientType !== RecipientType.CUSTOMER) {
      throw new Error('Unauthorized: This is not a customer notification')
    }
    if (notification.recipientId !== customerId) {
      throw new Error('Unauthorized: You can only mark your own notifications as read')
    }
    notification.markAsRead()
    await this.NotificationRepository.update({ id: notificationId }, notification)
  }
}
