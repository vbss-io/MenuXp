import Stripe from 'stripe'

import { NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export class CheckoutSessionCompletedProcessor {
  @inject('Logger')
  private readonly logger!: Logger

  @inject('SubscriptionRepository')
  private readonly subscriptionRepository!: SubscriptionRepository

  @inject('UserRepository')
  private readonly userRepository!: UserRepository

  @inject('PlanRepository')
  private readonly planRepository!: PlanRepository

  async process(event: Stripe.CheckoutSessionCompletedEvent): Promise<void> {
    const session = event.data.object
    this.logger.info('Processing checkout.session.completed event', {
      sessionId: session.id,
      customerId: session.customer,
      subscriptionId: session.subscription
    })
    if (!session.customer || !session.subscription) {
      this.logger.warn('Checkout session missing customer or subscription', {
        sessionId: session.id
      })
      return
    }
    const customerId = session.customer as string
    const subscriptionId = session.subscription as string
    const metadata = session.metadata || {}
    const planId = metadata.planId
    if (!planId) {
      this.logger.warn('Checkout session missing planId in metadata', {
        sessionId: session.id
      })
      throw new NotFoundError('Plan metadata', session.id)
    }
    const user = await this.userRepository.findOne({
      externalCustomerId: customerId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    if (!user) throw new NotFoundError('User', customerId)
    const plan = await this.planRepository.findById(planId)
    if (!plan) throw new NotFoundError('Plan', planId)
    const subscription = await this.subscriptionRepository.findOne({
      userId: user.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    if (!subscription) throw new NotFoundError('Subscription', user.id as string)
    subscription.planId = plan.id as string
    subscription.planMetadata = {
      name: plan.name,
      code: plan.code,
      price: plan.price,
      currency: plan.currency,
      features: plan.features
    }
    subscription.setExternalSubscriptionId(subscriptionId)
    subscription.activate()
    await this.subscriptionRepository.update({ id: subscription.id }, subscription)
    if (!user.currentSubscriptionId) {
      user.currentSubscriptionId = subscription.id as string
      await this.userRepository.update({ id: user.id }, user)
    }
    const username = user.name ?? user.email
    await subscription.notifyPaymentConfirmed(username, user.email)
    this.logger.info('Checkout session processed successfully', {
      userId: user.id,
      subscriptionId: subscription.id,
      externalSubscriptionId: subscriptionId,
      planCode: plan.code,
      planId: plan.id
    })
  }
}
