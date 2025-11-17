import Stripe from 'stripe'

import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'

export class SubscriptionDeletedProcessor {
  @inject('Logger')
  private readonly logger!: Logger

  @inject('SubscriptionRepository')
  private readonly subscriptionRepository!: SubscriptionRepository

  async process(event: Stripe.CustomerSubscriptionDeletedEvent): Promise<void> {
    const stripeSubscription = event.data.object
    this.logger.info('Processing customer.subscription.deleted event', {
      subscriptionId: stripeSubscription.id,
      customerId: stripeSubscription.customer
    })
    const subscription = await this.subscriptionRepository.findOne({
      externalSubscriptionId: stripeSubscription.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    if (!subscription) {
      this.logger.warn('Subscription not found for delete event', {
        externalSubscriptionId: stripeSubscription.id
      })
      return
    }
    subscription.cancel('Cancelled via Stripe')
    await this.subscriptionRepository.update({ id: subscription.id }, subscription)
    this.logger.info('Subscription cancelled successfully', {
      subscriptionId: subscription.id,
      cancelledAt: subscription.cancelledAt
    })
  }
}
