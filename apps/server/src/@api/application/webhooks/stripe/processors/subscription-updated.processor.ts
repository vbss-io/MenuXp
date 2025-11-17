import Stripe from 'stripe'

import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'

export class SubscriptionUpdatedProcessor {
  @inject('Logger')
  private readonly logger!: Logger

  @inject('SubscriptionRepository')
  private readonly subscriptionRepository!: SubscriptionRepository

  @inject('PlanRepository')
  private readonly planRepository!: PlanRepository

  async process(event: Stripe.CustomerSubscriptionUpdatedEvent): Promise<void> {
    const stripeSubscription = event.data.object
    this.logger.info('Processing customer.subscription.updated event', {
      subscriptionId: stripeSubscription.id,
      status: stripeSubscription.status,
      customerId: stripeSubscription.customer
    })
    const subscription = await this.subscriptionRepository.findOne({
      externalSubscriptionId: stripeSubscription.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    if (!subscription) {
      this.logger.warn('Subscription not found for update event', {
        externalSubscriptionId: stripeSubscription.id
      })
      return
    }
    const currentPeriodEnd = (stripeSubscription as unknown as { current_period_end?: number }).current_period_end
    const periodEnd = currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : undefined
    const latestInvoiceId = stripeSubscription.latest_invoice
      ? (stripeSubscription.latest_invoice as string)
      : undefined
    const newPriceId = stripeSubscription.items.data[0]?.price.id
    const currentPriceId =
      subscription.billingCycle === 'monthly'
        ? await this.planRepository.findOne({ monthlyPriceId: newPriceId } as never)
        : await this.planRepository.findOne({ yearlyPriceId: newPriceId } as never)
    if (newPriceId && currentPriceId) {
      const newPlan = await this.planRepository.findOne({
        $or: [{ monthlyPriceId: newPriceId }, { yearlyPriceId: newPriceId }]
      } as never)
      if (newPlan && newPlan.id !== subscription.planId) {
        this.logger.info('Plan change detected', {
          subscriptionId: subscription.id,
          oldPlan: subscription.planMetadata.code,
          newPlan: newPlan.code
        })
        subscription.planId = newPlan.id as string
        subscription.planMetadata = {
          name: newPlan.name,
          code: newPlan.code,
          price: newPlan.price,
          currency: newPlan.currency,
          features: newPlan.features
        }
      }
    }
    subscription.updateFromStripeSubscription({
      status: stripeSubscription.status,
      currentPeriodEnd: periodEnd,
      latestInvoiceId
    })
    if (stripeSubscription.status === 'past_due' || stripeSubscription.status === 'unpaid') {
      subscription.suspend()
    } else if (stripeSubscription.status === 'active') {
      subscription.activate()
    }
    await this.subscriptionRepository.update({ id: subscription.id }, subscription)
    this.logger.info('Subscription updated successfully', {
      subscriptionId: subscription.id,
      planCode: subscription.planMetadata.code,
      status: subscription.status,
      nextBillingDate: subscription.nextBillingDate
    })
  }
}
