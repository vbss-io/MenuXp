import { Registry } from '@api/infra/dependency-injection/registry'
import { GetUserSubscriptionController } from '@restaurants/application/subscriptions/get-user-subscription/get-user-subscription.controller'
import { GetUserSubscriptionUsecase } from '@restaurants/application/subscriptions/get-user-subscription/get-user-subscription.usecase'

export class SubscriptionsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetUserSubscriptionUsecase', new GetUserSubscriptionUsecase())
    new GetUserSubscriptionController()
  }
}
