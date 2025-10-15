import { createContext } from 'react'

import type { Notification } from '@/types/notification'

export interface NotificationContextData {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  markAsRead: (notificationId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  refreshNotifications: () => Promise<void>
}

const defaultContextValue: NotificationContextData = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  refreshNotifications: async () => {}
}

export const NotificationContext = createContext<NotificationContextData>(defaultContextValue)
