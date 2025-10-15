import type { NotificationType } from '../enums/notifications/notification-type.enum'
import type { RecipientType } from '../enums/notifications/recipient-type.enum'

export interface Notification {
  id: string
  type: NotificationType
  recipientType: RecipientType
  recipientId: string
  title: string
  message: string
  metadata?: Record<string, unknown>
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}
