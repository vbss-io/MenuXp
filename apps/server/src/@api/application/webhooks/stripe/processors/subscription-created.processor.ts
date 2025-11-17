import Stripe from 'stripe'

import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'

export class SubscriptionCreatedProcessor {
  @inject('Logger')
  private readonly logger!: Logger

  @inject('SubscriptionRepository')
  private readonly subscriptionRepository!: SubscriptionRepository

  async process(event: Stripe.CustomerSubscriptionCreatedEvent): Promise<void> {
    const stripeSubscription = event.data.object
    this.logger.info('Processing customer.subscription.created event', {
      subscriptionId: stripeSubscription.id,
      status: stripeSubscription.status,
      customerId: stripeSubscription.customer
    })
    const subscription = await this.subscriptionRepository.findOne({
      externalSubscriptionId: stripeSubscription.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    if (subscription) {
      this.logger.info('Subscription already exists, skipping creation', {
        subscriptionId: subscription.id
      })
      return
    }
    this.logger.info('Subscription creation event acknowledged', {
      externalSubscriptionId: stripeSubscription.id,
      status: stripeSubscription.status
    })
  }
}
