import Stripe from 'stripe'

import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'

export class InvoicePaymentFailedProcessor {
  @inject('Logger')
  private readonly logger!: Logger

  @inject('SubscriptionRepository')
  private readonly subscriptionRepository!: SubscriptionRepository

  async process(event: Stripe.InvoicePaymentFailedEvent): Promise<void> {
    const invoice = event.data.object
    const subscriptionField = (invoice as unknown as { subscription?: string | Stripe.Subscription }).subscription
    const subscriptionId = typeof subscriptionField === 'string' ? subscriptionField : subscriptionField?.id
    this.logger.info('Processing invoice.payment_failed event', {
      invoiceId: invoice.id,
      subscriptionId,
      customerId: invoice.customer,
      attemptCount: invoice.attempt_count
    })
    if (!subscriptionId) {
      this.logger.warn('Invoice has no subscription', { invoiceId: invoice.id })
      return
    }
    const subscription = await this.subscriptionRepository.findOne({
      externalSubscriptionId: subscriptionId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    if (!subscription) {
      this.logger.warn('Subscription not found for failed payment', {
        externalSubscriptionId: subscriptionId
      })
      return
    }
    subscription.setLatestInvoice(invoice.id)
    subscription.setPaymentStatus('failed')
    subscription.suspend()
    await this.subscriptionRepository.update({ id: subscription.id }, subscription)
    this.logger.warn('Payment failed, subscription suspended', {
      subscriptionId: subscription.id,
      invoiceId: invoice.id,
      attemptCount: invoice.attempt_count
    })
  }
}
