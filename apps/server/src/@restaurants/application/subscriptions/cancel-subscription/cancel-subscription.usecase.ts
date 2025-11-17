import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { SubscriptionPaymentGateway } from '@api/infra/gateways/subscription-payment.gateway'

import { SubscriptionStatus } from '@restaurants/domain/subscriptions/enums/subscription-status.enum'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface CancelSubscriptionUsecaseInput {
  userId: string
  atPeriodEnd?: boolean
  reason?: string
}

interface CancelSubscriptionUsecaseOutput {
  status: string
  message: string
  effectiveDate?: Date
}

export class CancelSubscriptionUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('SubscriptionRepository')
  private readonly SubscriptionRepository!: SubscriptionRepository

  @inject('SubscriptionPaymentGateway')
  private readonly paymentGateway!: SubscriptionPaymentGateway

  @inject('Logger')
  private readonly logger!: Logger

  async execute({
    userId,
    atPeriodEnd = true,
    reason
  }: CancelSubscriptionUsecaseInput): Promise<CancelSubscriptionUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    if (!user.currentSubscriptionId) {
      throw new BadRequestError('User does not have an active subscription')
    }
    const subscription = await this.SubscriptionRepository.findById(user.currentSubscriptionId)
    if (!subscription) throw new NotFoundError('Subscription', user.currentSubscriptionId)
    if (subscription.isCancelled()) {
      throw new BadRequestError('Subscription is already cancelled')
    }
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new BadRequestError('Only active subscriptions can be cancelled')
    }
    if (!subscription.externalSubscriptionId) {
      throw new BadRequestError('Subscription is not linked to Stripe')
    }
    await this.paymentGateway.cancelSubscription(subscription.externalSubscriptionId, atPeriodEnd)
    if (!atPeriodEnd) {
      subscription.cancel(reason)
      await this.SubscriptionRepository.update({ id: subscription.id }, subscription)
    }
    this.logger.info('Subscription cancellation initiated', {
      userId: user.id,
      subscriptionId: subscription.id,
      atPeriodEnd,
      reason
    })
    const message = atPeriodEnd
      ? 'Subscription will be cancelled at the end of the current billing period. You will retain access until then.'
      : 'Subscription cancelled immediately. Access has been revoked.'
    return {
      status: atPeriodEnd ? 'scheduled_cancellation' : 'cancelled',
      message,
      effectiveDate: atPeriodEnd ? subscription.nextBillingDate : new Date()
    }
  }
}
