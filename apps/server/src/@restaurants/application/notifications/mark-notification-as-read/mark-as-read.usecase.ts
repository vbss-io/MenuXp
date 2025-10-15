import { NotFoundError, UnauthorizedError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import type { MarkNotificationAsReadType } from '@restaurants/application/notifications/mark-notification-as-read/mark-as-read.schema'
import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import { NotificationRepository } from '@restaurants/infra/repositories/notifications.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export type MarkNotificationAsReadUsecaseInput = MarkNotificationAsReadType & {
  userId: string
}

export class MarkNotificationAsReadUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('NotificationRepository')
  private readonly NotificationRepository!: NotificationRepository

  async execute({ userId, notificationId }: MarkNotificationAsReadUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const notification = await this.NotificationRepository.findById(notificationId)
    if (!notification) throw new NotFoundError('Notification', notificationId)
    if (notification.recipientType !== RecipientType.RESTAURANT) {
      throw new UnauthorizedError('Notification is not a restaurant notification')
    }
    const restaurant = await this.RestaurantRepository.findById(notification.recipientId)
    if (!restaurant) throw new NotFoundError('Restaurant', notification.recipientId)
    if (!restaurant.hasPermission(userId)) {
      throw new UnauthorizedError('User not authorized to access this restaurant')
    }
    notification.markAsRead()
    await this.NotificationRepository.update({ id: notificationId }, notification)
  }
}
