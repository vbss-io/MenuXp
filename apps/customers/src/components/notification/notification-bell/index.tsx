import { Bell, BellSlash, CircleNotch, Info, ShoppingBag, Tag, ChatCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import { Popover } from '@menuxp/ui'
import { useNotifications } from '@/hooks/use-notifications'
import { NotificationType } from '@/types/notification'

import * as S from './styles'

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.ORDER:
      return ShoppingBag
    case NotificationType.SYSTEM:
      return Info
    case NotificationType.PROMOTION:
      return Tag
    case NotificationType.MESSAGE:
      return ChatCircle
    default:
      return Bell
  }
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Agora'
  if (minutes < 60) return `${minutes}m atrás`
  if (hours < 24) return `${hours}h atrás`
  if (days < 7) return `${days}d atrás`

  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

export const NotificationBell: React.FC = () => {
  const { notifications = [], unreadCount = 0, isLoading, markAsRead, markAllAsRead } = useNotifications()

  const handleNotificationClick = async (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      await markAsRead(notificationId)
    }
  }

  const trigger = (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <S.BellButton aria-label="Notificações">
        <Bell size={24} weight="regular" />
        {unreadCount > 0 && <S.Badge>{unreadCount > 99 ? '99+' : unreadCount}</S.Badge>}
      </S.BellButton>
    </motion.div>
  )

  const content = (
    <div>
      <S.Header>
        <S.Title>Notificações</S.Title>
        {unreadCount > 0 && (
          <S.MarkAllButton onClick={markAllAsRead} disabled={isLoading}>
            Marcar todas como lidas
          </S.MarkAllButton>
        )}
      </S.Header>

      {isLoading && (
        <S.LoadingState>
          <CircleNotch size={32} weight="bold" />
        </S.LoadingState>
      )}

      {!isLoading && notifications.length === 0 && (
        <S.EmptyState>
          <BellSlash size={64} weight="thin" />
          <p>Nenhuma notificação ainda</p>
        </S.EmptyState>
      )}

      {!isLoading && notifications.length > 0 && (
        <S.NotificationList>
          {notifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type)
            return (
              <S.NotificationItem
                key={notification.id}
                $isRead={notification.isRead}
                onClick={() => handleNotificationClick(notification.id, notification.isRead)}
              >
                <S.NotificationIcon $type={notification.type}>
                  <IconComponent size={20} weight="duotone" />
                </S.NotificationIcon>

                <S.NotificationContent>
                  <S.NotificationTitle>{notification.title}</S.NotificationTitle>
                  <S.NotificationMessage>{notification.message}</S.NotificationMessage>
                  <S.NotificationTime>{formatTime(notification.createdAt)}</S.NotificationTime>
                </S.NotificationContent>

                {!notification.isRead && <S.UnreadIndicator />}
              </S.NotificationItem>
            )
          })}
        </S.NotificationList>
      )}
    </div>
  )

  return (
    <S.Container>
      <Popover trigger={trigger} variant="outline" side="bottom" align="end" sideOffset={10}>
        {content}
      </Popover>
    </S.Container>
  )
}

NotificationBell.displayName = 'NotificationBell'

export default NotificationBell
