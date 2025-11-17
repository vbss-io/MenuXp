import crypto from 'crypto'
import Stripe from 'stripe'

import { BaseController } from '@api/application/@base.controller'
import { CheckoutSessionCompletedProcessor } from '@api/application/webhooks/stripe/processors/checkout-session-completed.processor'
import { InvoicePaymentFailedProcessor } from '@api/application/webhooks/stripe/processors/invoice-payment-failed.processor'
import { InvoicePaymentSucceededProcessor } from '@api/application/webhooks/stripe/processors/invoice-payment-succeeded.processor'
import { SubscriptionCreatedProcessor } from '@api/application/webhooks/stripe/processors/subscription-created.processor'
import { SubscriptionDeletedProcessor } from '@api/application/webhooks/stripe/processors/subscription-deleted.processor'
import { SubscriptionUpdatedProcessor } from '@api/application/webhooks/stripe/processors/subscription-updated.processor'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { StripeWebhookLog } from '@restaurants/domain/webhooks/stripe-webhook-log.entity'
import { StripeWebhookLogRepository } from '@restaurants/infra/repositories/stripe-webhook-log.repository'

const SUPPORTED_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed'
] as const

type SupportedEvent = (typeof SUPPORTED_EVENTS)[number]

export class StripeWebhookController extends BaseController {
  @inject('Logger')
  private readonly logger!: Logger

  @inject('StripeWebhookLogRepository')
  private readonly webhookLogRepository!: StripeWebhookLogRepository

  @inject('CheckoutSessionCompletedProcessor')
  private readonly checkoutSessionProcessor!: CheckoutSessionCompletedProcessor

  @inject('SubscriptionCreatedProcessor')
  private readonly subscriptionCreatedProcessor!: SubscriptionCreatedProcessor

  @inject('SubscriptionUpdatedProcessor')
  private readonly subscriptionUpdatedProcessor!: SubscriptionUpdatedProcessor

  @inject('SubscriptionDeletedProcessor')
  private readonly subscriptionDeletedProcessor!: SubscriptionDeletedProcessor

  @inject('InvoicePaymentSucceededProcessor')
  private readonly invoicePaymentSucceededProcessor!: InvoicePaymentSucceededProcessor

  @inject('InvoicePaymentFailedProcessor')
  private readonly invoicePaymentFailedProcessor!: InvoicePaymentFailedProcessor

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/webhooks/stripe',
      async (params) => {
        const event = params.stripeEvent as Stripe.Event
        await this.processWebhook(event)
        return { received: true }
      },
      HttpCode.OK,
      'isStripe'
    )
  }

  private async processWebhook(event: Stripe.Event): Promise<void> {
    const startTime = Date.now()
    this.logger.info('Stripe webhook received', {
      eventId: event.id,
      eventType: event.type
    })
    if (await this.webhookLogRepository.isDuplicate(event.id)) {
      this.logger.info('Webhook event already processed, skipping', {
        eventId: event.id
      })
      return
    }
    const payloadHash = this.computePayloadHash(event)
    const webhookLog = StripeWebhookLog.create({
      eventId: event.id,
      eventType: event.type,
      payloadHash
    })
    try {
      await this.routeEvent(event)
      webhookLog.markAsSuccess()
      await this.webhookLogRepository.create(webhookLog)
      const duration = Date.now() - startTime
      this.logger.info('Webhook processed successfully', {
        eventId: event.id,
        eventType: event.type,
        durationMs: duration
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      webhookLog.markAsFailed(errorMessage)
      await this.webhookLogRepository.create(webhookLog)
      this.logger.error('Webhook processing failed', {
        eventId: event.id,
        eventType: event.type,
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      })
      throw error
    }
  }

  private async routeEvent(event: Stripe.Event): Promise<void> {
    const eventType = event.type as SupportedEvent
    if (!SUPPORTED_EVENTS.includes(eventType)) {
      this.logger.info('Webhook event type not supported, skipping', {
        eventType
      })
      return
    }
    switch (eventType) {
      case 'checkout.session.completed':
        await this.checkoutSessionProcessor.process(event as Stripe.CheckoutSessionCompletedEvent)
        break
      case 'customer.subscription.created':
        await this.subscriptionCreatedProcessor.process(event as Stripe.CustomerSubscriptionCreatedEvent)
        break
      case 'customer.subscription.updated':
        await this.subscriptionUpdatedProcessor.process(event as Stripe.CustomerSubscriptionUpdatedEvent)
        break
      case 'customer.subscription.deleted':
        await this.subscriptionDeletedProcessor.process(event as Stripe.CustomerSubscriptionDeletedEvent)
        break
      case 'invoice.payment_succeeded':
        await this.invoicePaymentSucceededProcessor.process(event as Stripe.InvoicePaymentSucceededEvent)
        break
      case 'invoice.payment_failed':
        await this.invoicePaymentFailedProcessor.process(event as Stripe.InvoicePaymentFailedEvent)
        break
      default:
        this.logger.warn('Unhandled event type', { eventType })
    }
  }

  private computePayloadHash(event: Stripe.Event): string {
    const payload = JSON.stringify(event.data.object)
    return crypto.createHash('sha256').update(payload).digest('hex')
  }
}
