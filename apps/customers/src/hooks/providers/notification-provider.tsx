import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { NotificationContext } from '@/hooks/contexts/notification-context'
import { useClient } from '@/hooks/use-client'
import { getCustomerNotifications } from '@/services/notification/get-customer-notifications'
import { markNotificationAsRead } from '@/services/notification/mark-notification-as-read'
import type { Notification } from '@/types/notification'

interface NotificationProviderProps {
  children: React.ReactNode
}

const POLLING_INTERVAL = 30000

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { client } = useClient()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchNotifications = useCallback(async () => {
    if (!client?.id) return
    try {
      setIsLoading(true)
      const response = await getCustomerNotifications({
        customerId: client.id,
        limit: 50,
        offset: 0,
        unreadOnly: false
      })
      setNotifications(response.notifications)
      setUnreadCount(response.unreadCount)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }, [client?.id])

  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!client?.id) return
      try {
        await markNotificationAsRead({
          customerId: client.id,
          notificationId
        })
        setNotifications((prev) =>
          prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif))
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      } catch (error) {
        console.error('Error marking notification as read:', error)
      }
    },
    [client?.id]
  )

  const markAllAsRead = useCallback(async () => {
    if (!client?.id) return
    try {
      const unreadNotifications = notifications.filter((notif) => !notif.isRead)
      await Promise.all(
        unreadNotifications.map((notif) =>
          markNotificationAsRead({
            customerId: client.id,
            notificationId: notif.id
          })
        )
      )
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }, [client?.id, notifications])

  const refreshNotifications = useCallback(async () => {
    await fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    if (client?.id) {
      void fetchNotifications()
      intervalRef.current = setInterval(() => {
        void fetchNotifications()
      }, POLLING_INTERVAL)
    } else {
      setNotifications([])
      setUnreadCount(0)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [client?.id, fetchNotifications])

  const contextValue = useMemo(
    () => ({
      notifications,
      unreadCount,
      isLoading,
      markAsRead,
      markAllAsRead,
      refreshNotifications
    }),
    [notifications, unreadCount, isLoading, markAsRead, markAllAsRead, refreshNotifications]
  )

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
}
