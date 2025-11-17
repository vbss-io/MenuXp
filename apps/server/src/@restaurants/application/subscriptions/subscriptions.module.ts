import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { CancelSubscriptionController } from '@restaurants/application/subscriptions/cancel-subscription/cancel-subscription.controller'
import { cancelSubscriptionSchema } from '@restaurants/application/subscriptions/cancel-subscription/cancel-subscription.schema'
import { CancelSubscriptionUsecase } from '@restaurants/application/subscriptions/cancel-subscription/cancel-subscription.usecase'
import { CreateBillingPortalSessionController } from '@restaurants/application/subscriptions/create-billing-portal-session/create-billing-portal-session.controller'
import { createBillingPortalSessionSchema } from '@restaurants/application/subscriptions/create-billing-portal-session/create-billing-portal-session.schema'
import { CreateBillingPortalSessionUsecase } from '@restaurants/application/subscriptions/create-billing-portal-session/create-billing-portal-session.usecase'
import { CreateCheckoutSessionController } from '@restaurants/application/subscriptions/create-checkout-session/create-checkout-session.controller'
import { createCheckoutSessionSchema } from '@restaurants/application/subscriptions/create-checkout-session/create-checkout-session.schema'
import { CreateCheckoutSessionUsecase } from '@restaurants/application/subscriptions/create-checkout-session/create-checkout-session.usecase'
import { GetUserSubscriptionController } from '@restaurants/application/subscriptions/get-user-subscription/get-user-subscription.controller'
import { GetUserSubscriptionUsecase } from '@restaurants/application/subscriptions/get-user-subscription/get-user-subscription.usecase'
import { UpdateSubscriptionPlanController } from '@restaurants/application/subscriptions/update-subscription-plan/update-subscription-plan.controller'
import { updateSubscriptionPlanSchema } from '@restaurants/application/subscriptions/update-subscription-plan/update-subscription-plan.schema'
import { UpdateSubscriptionPlanUsecase } from '@restaurants/application/subscriptions/update-subscription-plan/update-subscription-plan.usecase'
import { UpdateSubscriptionController } from '@restaurants/application/subscriptions/update-subscription/update-subscription.controller'
import { updateSubscriptionSchema } from '@restaurants/application/subscriptions/update-subscription/update-subscription.schema'
import { UpdateSubscriptionUsecase } from '@restaurants/application/subscriptions/update-subscription/update-subscription.usecase'

export class SubscriptionsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetUserSubscriptionUsecase', new GetUserSubscriptionUsecase())
    new GetUserSubscriptionController()

    registry.provide('CreateCheckoutSessionValidate', new ZodAdapter(createCheckoutSessionSchema))
    registry.provide('CreateCheckoutSessionUsecase', new CreateCheckoutSessionUsecase())
    new CreateCheckoutSessionController()

    registry.provide('CreateBillingPortalSessionValidate', new ZodAdapter(createBillingPortalSessionSchema))
    registry.provide('CreateBillingPortalSessionUsecase', new CreateBillingPortalSessionUsecase())
    new CreateBillingPortalSessionController()

    registry.provide('UpdateSubscriptionValidate', new ZodAdapter(updateSubscriptionSchema))
    registry.provide('UpdateSubscriptionUsecase', new UpdateSubscriptionUsecase())
    new UpdateSubscriptionController()

    registry.provide('CancelSubscriptionValidate', new ZodAdapter(cancelSubscriptionSchema))
    registry.provide('CancelSubscriptionUsecase', new CancelSubscriptionUsecase())
    new CancelSubscriptionController()

    registry.provide('UpdateSubscriptionPlanValidate', new ZodAdapter(updateSubscriptionPlanSchema))
    registry.provide('UpdateSubscriptionPlanUsecase', new UpdateSubscriptionPlanUsecase())
    new UpdateSubscriptionPlanController()
  }
}
