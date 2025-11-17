import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { SubscriptionPaymentGateway } from '@api/infra/gateways/subscription-payment.gateway'
import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import { BillingCycle } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface UpdateSubscriptionPlanUsecaseInput {
  userId: string
  planCode: PlanCode
}

interface UpdateSubscriptionPlanUsecaseOutput {
  success: boolean
  message: string
}

export class UpdateSubscriptionPlanUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('PlanRepository')
  private readonly PlanRepository!: PlanRepository

  @inject('SubscriptionRepository')
  private readonly SubscriptionRepository!: SubscriptionRepository

  @inject('SubscriptionPaymentGateway')
  private readonly paymentGateway!: SubscriptionPaymentGateway

  @inject('Logger')
  private readonly logger!: Logger

  async execute({
    userId,
    planCode
  }: UpdateSubscriptionPlanUsecaseInput): Promise<UpdateSubscriptionPlanUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    if (!user.currentSubscriptionId) {
      throw new BadRequestError('User has no active subscription')
    }
    const subscription = await this.SubscriptionRepository.findById(user.currentSubscriptionId)
    if (!subscription) {
      throw new NotFoundError('Subscription', user.currentSubscriptionId)
    }
    if (!subscription.externalSubscriptionId) {
      throw new BadRequestError('Subscription is not linked to Stripe')
    }
    if (subscription.planMetadata.code === planCode) {
      throw new BadRequestError('User is already on this plan')
    }
    const newPlan = await this.PlanRepository.findOne({ code: planCode })
    if (!newPlan) throw new NotFoundError('Plan', planCode)
    if (!newPlan.isActive) {
      throw new BadRequestError('Selected plan is not currently available')
    }
    const priceId = subscription.billingCycle === BillingCycle.MONTHLY ? newPlan.monthlyPriceId : newPlan.yearlyPriceId
    if (!priceId) {
      throw new BadRequestError(`Price not available for ${subscription.billingCycle} billing cycle`)
    }
    const isUpgrade = newPlan.price > subscription.planMetadata.price
    const prorationBehavior = isUpgrade ? 'always_invoice' : 'create_prorations'
    await this.paymentGateway.updateSubscriptionPlan({
      externalSubscriptionId: subscription.externalSubscriptionId,
      newPriceId: priceId,
      prorationBehavior
    })
    this.logger.info('Subscription plan update requested', {
      userId: user.id,
      subscriptionId: subscription.id,
      oldPlan: subscription.planMetadata.code,
      newPlan: planCode,
      billingCycle: subscription.billingCycle,
      isUpgrade,
      prorationBehavior
    })
    return {
      success: true,
      message: 'Plan change initiated. Your subscription will be updated shortly.'
    }
  }
}
