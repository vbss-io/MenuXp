import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import type { NotificationType } from '@restaurants/domain/notifications/enums/notification-type.enum'
import type { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import { Notification } from '@restaurants/domain/notifications/notifications.entity'
import { type NotificationDocument, NotificationModel } from '@restaurants/domain/notifications/notifications.schema'

export interface NotificationRepository<T = unknown> extends BaseRepository<T, Notification> {
  toDomain(notification: T): Notification
}

export class NotificationRepositoryMongoose
  extends BaseRepositoryMongoose<NotificationDocument, Notification>
  implements NotificationRepository<NotificationDocument>
{
  constructor(model = NotificationModel) {
    super(model)
  }

  toDomain(entity: NotificationDocument): Notification {
    return Notification.restore({
      id: entity._id.toString(),
      type: entity.type as NotificationType,
      recipientType: entity.recipientType as RecipientType,
      recipientId: entity.recipientId,
      title: entity.title,
      message: entity.message,
      metadata: entity.metadata,
      isRead: entity.isRead,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
