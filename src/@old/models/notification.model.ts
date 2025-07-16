import type { NotificationsType } from '@/domain/enums/notifications-type.enum'

export interface Notification {
  id: number
  type: NotificationsType
  message: string
}
