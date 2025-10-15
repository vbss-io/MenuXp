import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { inject, Registry } from '@api/infra/dependency-injection/registry'
import { NotificationListenersController } from '@restaurants/application/notifications/@listeners/notification-listeners.controller'
import { OrderCreatedListener } from '@restaurants/application/notifications/@listeners/order-created.listener'
import { OrderStatusChangedListener } from '@restaurants/application/notifications/@listeners/order-status-changed.listener'
import { CreateNotificationUsecase } from '@restaurants/application/notifications/create-notification/create-notification.usecase'
import { GetRestaurantNotificationsController } from '@restaurants/application/notifications/get-restaurant-notifications/get-restaurant-notifications.controller'
import { GetRestaurantNotificationsSchema } from '@restaurants/application/notifications/get-restaurant-notifications/get-restaurant-notifications.schema'
import { GetRestaurantNotificationsUsecase } from '@restaurants/application/notifications/get-restaurant-notifications/get-restaurant-notifications.usecase'
import { MarkNotificationAsReadController } from '@restaurants/application/notifications/mark-notification-as-read/mark-as-read.controller'
import { MarkNotificationAsReadSchema } from '@restaurants/application/notifications/mark-notification-as-read/mark-as-read.schema'
import { MarkNotificationAsReadUsecase } from '@restaurants/application/notifications/mark-notification-as-read/mark-as-read.usecase'
import { ORDER_CREATED, ORDER_STATUS_CHANGED } from '@restaurants/domain/orders/consts/order-events.const'

export class RestaurantNotificationsModule {
  @inject('Queue')
  private readonly Queue!: Queue

  constructor() {
    const registry = Registry.getInstance()

    void this.Queue.register(ORDER_CREATED.eventName, ORDER_CREATED.consume)
    void this.Queue.register(ORDER_STATUS_CHANGED.eventName, ORDER_STATUS_CHANGED.consume)

    registry.provide('CreateNotificationUsecase', new CreateNotificationUsecase())

    registry.provide('OrderCreatedListener', new OrderCreatedListener())
    registry.provide('OrderStatusChangedListener', new OrderStatusChangedListener())
    new NotificationListenersController()

    registry.provide('GetRestaurantNotificationsValidate', new ZodAdapter(GetRestaurantNotificationsSchema))
    registry.provide('GetRestaurantNotificationsUsecase', new GetRestaurantNotificationsUsecase())
    new GetRestaurantNotificationsController()

    registry.provide('MarkNotificationAsReadValidate', new ZodAdapter(MarkNotificationAsReadSchema))
    registry.provide('MarkNotificationAsReadUsecase', new MarkNotificationAsReadUsecase())
    new MarkNotificationAsReadController()
  }
}
