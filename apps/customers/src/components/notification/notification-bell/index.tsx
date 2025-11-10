import { Bell, BellSlash, ChatCircle, CircleNotch, Info, ShoppingBag, Tag } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'
import { useTranslator } from 'vbss-translator'

import { useNotifications } from '@/hooks/use-notifications'
import { NotificationType } from '@/types/notification'
import { Popover, useLayout } from '@menuxp/ui'

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

const formatTime = (date: Date, t: (key: string) => string) => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return t('Agora')
  if (minutes < 60) return `${minutes}${t('m atrás')}`
  if (hours < 24) return `${hours}${t('h atrás')}`
  if (days < 7) return `${days}${t('d atrás')}`

  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

export const NotificationBell: React.FC = () => {
  const { t } = useTranslator()
  const { layout } = useLayout()
  const { notifications = [], unreadCount = 0, isLoading, markAsRead, markAllAsRead } = useNotifications()

  const handleNotificationClick = async (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      await markAsRead(notificationId)
    }
  }

  const trigger = (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <S.BellButton className="bell-button" aria-label={t('Notificações')}>
        <Bell size={24} weight="regular" />
        {unreadCount > 0 && <S.Badge className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</S.Badge>}
      </S.BellButton>
    </motion.div>
  )

  const content = (
    <div>
      <S.Header className="notification-header">
        <S.Title className="notification-title">{t('Notificações')}</S.Title>
        {unreadCount > 0 && (
          <S.MarkAllButton className="mark-all-button" onClick={markAllAsRead} disabled={isLoading}>
            {t('Marcar todas como lidas')}
          </S.MarkAllButton>
        )}
      </S.Header>

      {isLoading && (
        <S.LoadingState className="loading-spinner">
          <CircleNotch size={32} weight="bold" />
        </S.LoadingState>
      )}

      {!isLoading && notifications.length === 0 && (
        <S.EmptyState className="empty-state">
          <BellSlash size={64} weight="thin" />
          <p>{t('Nenhuma notificação ainda')}</p>
        </S.EmptyState>
      )}

      {!isLoading && notifications.length > 0 && (
        <S.NotificationList className="notification-list">
          {notifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type)
            return (
              <S.NotificationItem
                key={notification.id}
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                $isRead={notification.isRead}
                onClick={() => handleNotificationClick(notification.id, notification.isRead)}
              >
                <S.NotificationIcon className="notification-icon-container" $type={notification.type}>
                  <IconComponent size={20} weight="duotone" />
                </S.NotificationIcon>

                <S.NotificationContent className="notification-content">
                  <S.NotificationTitle className="notification-title-text">{notification.title}</S.NotificationTitle>
                  <S.NotificationMessage className="notification-message-text">
                    {notification.message}
                  </S.NotificationMessage>
                  <S.NotificationTime className="notification-time-text">
                    {formatTime(notification.createdAt, t)}
                  </S.NotificationTime>
                </S.NotificationContent>

                {!notification.isRead && <S.UnreadIndicator className="unread-indicator" />}
              </S.NotificationItem>
            )
          })}
        </S.NotificationList>
      )}
    </div>
  )

  return (
    <S.Container className={`notification-bell layout-${layout}`}>
      <Popover trigger={trigger} variant="outline" side="bottom" align="end" sideOffset={10}>
        {content}
      </Popover>
    </S.Container>
  )
}

NotificationBell.displayName = 'NotificationBell'

export default NotificationBell
