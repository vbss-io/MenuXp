import { NotFoundError, UnauthorizedError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import type { GetRestaurantNotificationsType } from '@restaurants/application/notifications/get-restaurant-notifications/get-restaurant-notifications.schema'
import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import type { Notification } from '@restaurants/domain/notifications/notifications.entity'
import { NotificationRepository } from '@restaurants/infra/repositories/notifications.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export type GetRestaurantNotificationsUsecaseInput = GetRestaurantNotificationsType & {
  userId: string
}

export interface GetRestaurantNotificationsUsecaseOutput {
  notifications: Notification[]
  total: number
  unreadCount: number
}

export class GetRestaurantNotificationsUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('NotificationRepository')
  private readonly NotificationRepository!: NotificationRepository

  async execute({
    userId,
    restaurantId,
    limit,
    offset,
    unreadOnly
  }: GetRestaurantNotificationsUsecaseInput): Promise<GetRestaurantNotificationsUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) {
      throw new UnauthorizedError('User not authorized to access this restaurant')
    }
    const filter: Record<string, unknown> = {
      recipientType: RecipientType.RESTAURANT,
      recipientId: restaurantId
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
