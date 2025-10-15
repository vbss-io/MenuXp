import { inject } from '@api/infra/dependency-injection/registry'
import { Notification } from '@restaurants/domain/notifications/notifications.entity'
import { NotificationRepository } from '@restaurants/infra/repositories/notifications.repository'
import { CreateNotificationType } from './create-notification.schema'

export type CreateNotificationUsecaseInput = CreateNotificationType

export interface CreateNotificationUsecaseOutput {
  id: string
}

export class CreateNotificationUsecase {
  @inject('NotificationRepository')
  private readonly NotificationRepository!: NotificationRepository

  async execute(input: CreateNotificationUsecaseInput): Promise<CreateNotificationUsecaseOutput> {
    const notification = Notification.create({
      type: input.type,
      recipientType: input.recipientType,
      recipientId: input.recipientId,
      title: input.title,
      message: input.message,
      metadata: input.metadata
    })

    const createdNotification = await this.NotificationRepository.create(notification)

    return { id: createdNotification.id as string }
  }
}
