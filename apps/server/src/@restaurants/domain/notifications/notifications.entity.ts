import type { NotificationType } from '@restaurants/domain/notifications/enums/notification-type.enum'
import type { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'

export class Notification {
  isRead: boolean

  private constructor(
    readonly id: string | undefined,
    readonly type: NotificationType,
    readonly recipientType: RecipientType,
    readonly recipientId: string,
    readonly title: string,
    readonly message: string,
    readonly metadata?: Record<string, unknown>,
    isRead?: boolean,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.isRead = isRead ?? false
  }

  static create(input: CreateNotification): Notification {
    return new Notification(
      undefined,
      input.type,
      input.recipientType,
      input.recipientId,
      input.title,
      input.message,
      input.metadata,
      false
    )
  }

  static restore(input: RestoreNotification): Notification {
    return new Notification(
      input.id,
      input.type,
      input.recipientType,
      input.recipientId,
      input.title,
      input.message,
      input.metadata,
      input.isRead,
      input.createdAt,
      input.updatedAt
    )
  }

  markAsRead(): void {
    this.isRead = true
  }

  markAsUnread(): void {
    this.isRead = false
  }
}

export interface CreateNotification {
  type: NotificationType
  recipientType: RecipientType
  recipientId: string
  title: string
  message: string
  metadata?: Record<string, unknown>
}

type RestoreNotification = CreateNotification & {
  id: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}
