import { CheckoutSessionCompletedProcessor } from '@api/application/webhooks/stripe/processors/checkout-session-completed.processor'
import { InvoicePaymentFailedProcessor } from '@api/application/webhooks/stripe/processors/invoice-payment-failed.processor'
import { InvoicePaymentSucceededProcessor } from '@api/application/webhooks/stripe/processors/invoice-payment-succeeded.processor'
import { SubscriptionCreatedProcessor } from '@api/application/webhooks/stripe/processors/subscription-created.processor'
import { SubscriptionDeletedProcessor } from '@api/application/webhooks/stripe/processors/subscription-deleted.processor'
import { SubscriptionUpdatedProcessor } from '@api/application/webhooks/stripe/processors/subscription-updated.processor'
import { StripeWebhookController } from '@api/application/webhooks/stripe/stripe-webhook.controller'
import { Registry } from '@api/infra/dependency-injection/registry'

export class StripeWebhookModule {
  constructor() {
    const registry = Registry.getInstance()
    registry.provide('CheckoutSessionCompletedProcessor', new CheckoutSessionCompletedProcessor())
    registry.provide('SubscriptionCreatedProcessor', new SubscriptionCreatedProcessor())
    registry.provide('SubscriptionUpdatedProcessor', new SubscriptionUpdatedProcessor())
    registry.provide('SubscriptionDeletedProcessor', new SubscriptionDeletedProcessor())
    registry.provide('InvoicePaymentSucceededProcessor', new InvoicePaymentSucceededProcessor())
    registry.provide('InvoicePaymentFailedProcessor', new InvoicePaymentFailedProcessor())
    new StripeWebhookController()
  }
}
