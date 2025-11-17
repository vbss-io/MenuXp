import Stripe from 'stripe'

import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { SubscriptionRepository } from '@restaurants/infra/repositories/subscription.repository'

export class InvoicePaymentSucceededProcessor {
  @inject('Logger')
  private readonly logger!: Logger

  @inject('SubscriptionRepository')
  private readonly subscriptionRepository!: SubscriptionRepository

  async process(event: Stripe.InvoicePaymentSucceededEvent): Promise<void> {
    const invoice = event.data.object
    const subscriptionField = (invoice as unknown as { subscription?: string | Stripe.Subscription }).subscription
    const subscriptionId = typeof subscriptionField === 'string' ? subscriptionField : subscriptionField?.id
    this.logger.info('Processing invoice.payment_succeeded event', {
      invoiceId: invoice.id,
      subscriptionId,
      customerId: invoice.customer
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
      this.logger.warn('Subscription not found for invoice event', {
        externalSubscriptionId: subscriptionId
      })
      return
    }
    subscription.setLatestInvoice(invoice.id)
    subscription.setPaymentStatus('succeeded')
    if (invoice.invoice_pdf) {
      const hostedUrl = invoice.hosted_invoice_url ?? ''
      subscription.setInvoices(invoice.invoice_pdf, hostedUrl)
    }
    subscription.activate()
    await this.subscriptionRepository.update({ id: subscription.id }, subscription)
    this.logger.info('Invoice payment processed successfully', {
      subscriptionId: subscription.id,
      invoiceId: invoice.id,
      amount: invoice.amount_paid
    })
  }
}
