import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { GetCustomerNotificationsController } from '@customers/application/notifications/get-customer-notifications/get-customer-notifications.controller'
import { GetCustomerNotificationsSchema } from '@customers/application/notifications/get-customer-notifications/get-customer-notifications.schema'
import { GetCustomerNotificationsUsecase } from '@customers/application/notifications/get-customer-notifications/get-customer-notifications.usecase'
import { MarkCustomerNotificationAsReadController } from '@customers/application/notifications/mark-notification-as-read/mark-as-read.controller'
import { MarkCustomerNotificationAsReadSchema } from '@customers/application/notifications/mark-notification-as-read/mark-as-read.schema'
import { MarkCustomerNotificationAsReadUsecase } from '@customers/application/notifications/mark-notification-as-read/mark-as-read.usecase'

export class CustomerNotificationsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetCustomerNotificationsValidate', new ZodAdapter(GetCustomerNotificationsSchema))
    registry.provide('GetCustomerNotificationsUsecase', new GetCustomerNotificationsUsecase())
    new GetCustomerNotificationsController()

    registry.provide('MarkCustomerNotificationAsReadValidate', new ZodAdapter(MarkCustomerNotificationAsReadSchema))
    registry.provide('MarkCustomerNotificationAsReadUsecase', new MarkCustomerNotificationAsReadUsecase())
    new MarkCustomerNotificationAsReadController()
  }
}
