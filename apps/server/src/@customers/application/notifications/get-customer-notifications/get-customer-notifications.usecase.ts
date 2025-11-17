import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'

import type { GetCustomerNotificationsType } from '@customers/application/notifications/get-customer-notifications/get-customer-notifications.schema'
import { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import type { Notification } from '@restaurants/domain/notifications/notifications.entity'
import { NotificationRepository } from '@restaurants/infra/repositories/notifications.repository'

export interface GetCustomerNotificationsUsecaseOutput {
  notifications: Notification[]
  total: number
  unreadCount: number
}

export class GetCustomerNotificationsUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('NotificationRepository')
  private readonly NotificationRepository!: NotificationRepository

  async execute({
    customerId,
    limit,
    offset,
    unreadOnly
  }: GetCustomerNotificationsType): Promise<GetCustomerNotificationsUsecaseOutput> {
    const customer = await this.CustomerUserRepository.findById(customerId)
    if (!customer) throw new NotFoundError('Customer', customerId)
    const filter: Record<string, unknown> = {
      recipientType: RecipientType.CUSTOMER,
      recipientId: customerId
    }
    if (unreadOnly) filter.isRead = false
    const notifications = await this.NotificationRepository.find(filter)
    const sortedNotifications = notifications.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })
    const paginatedNotifications = sortedNotifications.slice(offset, offset + limit)
    const unreadCount = notifications.filter((n) => !n.isRead).length
    return {
      notifications: paginatedNotifications,
      total: notifications.length,
      unreadCount
    }
  }
}
