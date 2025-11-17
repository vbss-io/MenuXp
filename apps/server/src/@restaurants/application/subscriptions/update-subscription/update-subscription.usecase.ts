import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { SubscriptionPaymentGateway } from '@api/infra/gateways/subscription-payment.gateway'
import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import { BillingCycle } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'
import { SubscriptionStatus } from '@restaurants/domain/subscriptions/enums/subscription-status.enum'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface UpdateSubscriptionUsecaseInput {
  userId: string
  planCode: PlanCode
  billingCycle: BillingCycle
  prorationBehavior?: 'create_prorations' | 'none' | 'always_invoice'
}

interface UpdateSubscriptionUsecaseOutput {
  status: string
  message: string
}

export class UpdateSubscriptionUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('SubscriptionRepository')
  private readonly SubscriptionRepository!: SubscriptionRepository

  @inject('PlanRepository')
  private readonly PlanRepository!: PlanRepository

  @inject('SubscriptionPaymentGateway')
  private readonly paymentGateway!: SubscriptionPaymentGateway

  @inject('Logger')
  private readonly logger!: Logger

  async execute({
    userId,
    planCode,
    billingCycle,
    prorationBehavior = 'create_prorations'
  }: UpdateSubscriptionUsecaseInput): Promise<UpdateSubscriptionUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    if (!user.currentSubscriptionId) {
      throw new BadRequestError('User does not have an active subscription')
    }
    const subscription = await this.SubscriptionRepository.findById(user.currentSubscriptionId)
    if (!subscription) throw new NotFoundError('Subscription', user.currentSubscriptionId)
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new BadRequestError('Only active subscriptions can be updated')
    }
    if (!subscription.externalSubscriptionId) {
      throw new BadRequestError('Subscription is not linked to Stripe')
    }
    const newPlan = await this.PlanRepository.findOne({ code: planCode })
    if (!newPlan) throw new NotFoundError('Plan', planCode)
    if (!newPlan.isActive) {
      throw new BadRequestError('Selected plan is not currently available')
    }
    if (subscription.planMetadata.code === planCode && subscription.billingCycle === billingCycle) {
      throw new BadRequestError('New plan and billing cycle are the same as current subscription')
    }
    const newPriceId = billingCycle === BillingCycle.MONTHLY ? newPlan.monthlyPriceId : newPlan.yearlyPriceId
    if (!newPriceId) {
      throw new BadRequestError(`Price not available for ${billingCycle} billing cycle`)
    }
    const stripeSubscription = await this.paymentGateway.updateSubscriptionPlan({
      externalSubscriptionId: subscription.externalSubscriptionId,
      newPriceId,
      prorationBehavior
    })
    subscription.updateFromStripeSubscription({
      status: stripeSubscription.status,
      currentPeriodEnd: stripeSubscription.currentPeriodEnd,
      latestInvoiceId: stripeSubscription.latestInvoiceId
    })
    await this.SubscriptionRepository.update({ id: subscription.id }, subscription)
    this.logger.info('Subscription updated', {
      userId: user.id,
      subscriptionId: subscription.id,
      oldPlanCode: subscription.planMetadata.code,
      newPlanCode: planCode,
      oldBillingCycle: subscription.billingCycle,
      newBillingCycle: billingCycle
    })
    return {
      status: 'pending',
      message:
        'Subscription update initiated. Changes will be reflected once confirmed by payment provider via webhook.'
    }
  }
}
