export enum NotificationType {
  ORDER = 'order',
  SYSTEM = 'system',
  PROMOTION = 'promotion',
  MESSAGE = 'message'
}

export enum RecipientType {
  RESTAURANT = 'restaurant',
  CUSTOMER = 'customer'
}

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
