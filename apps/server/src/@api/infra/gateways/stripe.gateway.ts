import Stripe from 'stripe'

import type {
  CheckoutSessionResult,
  CreateCheckoutSessionInput,
  CreateCustomerInput,
  StripeCustomer,
  StripePrice,
  StripeProduct,
  StripeProductWithPrices,
  StripeSubscription,
  UpdateSubscriptionInput
} from './subscription-payment-gateway.types'
import type { SubscriptionPaymentGateway } from './subscription-payment.gateway'

export class StripePaymentGateway implements SubscriptionPaymentGateway {
  private readonly stripe: Stripe

  constructor(secretKey: string, apiVersion: Stripe.LatestApiVersion = '2025-10-29.clover') {
    this.stripe = new Stripe(secretKey, {
      apiVersion,
      maxNetworkRetries: 3,
      timeout: 30000
    })
  }

  async createCustomer(input: CreateCustomerInput): Promise<StripeCustomer> {
    const customer = await this.stripe.customers.create({
      email: input.email,
      name: input.name,
      tax_id_data: input.taxId
        ? [
            {
              type: 'br_cpf',
              value: input.taxId
            }
          ]
        : undefined,
      metadata: input.metadata
    })
    return {
      id: customer.id,
      email: customer.email ?? input.email,
      name: customer.name ?? input.name,
      taxId: input.taxId
    }
  }

  async createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CheckoutSessionResult> {
    const session = await this.stripe.checkout.sessions.create({
      customer: input.customerId,
      mode: 'subscription',
      line_items: [
        {
          price: input.priceId,
          quantity: 1
        }
      ],
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      locale: (input.locale as Stripe.Checkout.SessionCreateParams.Locale) || 'pt-BR',
      metadata: input.metadata,
      tax_id_collection: input.taxIdCollection ? { enabled: true } : undefined,
      automatic_tax: input.automaticTax ? { enabled: true } : undefined,
      customer_update: {
        address: 'auto'
      }
    })
    return {
      sessionId: session.id,
      url: session.url ?? ''
    }
  }

  async createBillingPortalSession(customerId: string, returnUrl: string): Promise<string> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    })
    return session.url
  }

  async cancelSubscription(externalSubscriptionId: string, atPeriodEnd: boolean): Promise<void> {
    await this.stripe.subscriptions.update(externalSubscriptionId, {
      cancel_at_period_end: atPeriodEnd
    })
  }

  async updateSubscriptionPlan(input: UpdateSubscriptionInput): Promise<StripeSubscription> {
    const subscription = await this.stripe.subscriptions.retrieve(input.externalSubscriptionId)
    const updatedSubscription = await this.stripe.subscriptions.update(input.externalSubscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: input.newPriceId
        }
      ],
      proration_behavior: input.prorationBehavior || 'create_prorations'
    })
    return this.mapSubscriptionToDomain(updatedSubscription)
  }

  async listActiveProducts(): Promise<StripeProductWithPrices[]> {
    const products = await this.stripe.products.list({
      active: true,
      expand: ['data.default_price']
    })
    const prices = await this.stripe.prices.list({
      active: true
    })
    const productWithPrices: StripeProductWithPrices[] = products.data.map((product) => {
      const productPrices = prices.data.filter((price) => price.product === product.id)
      return {
        product: this.mapProductToDomain(product),
        prices: productPrices.map((price) => this.mapPriceToDomain(price))
      }
    })
    return productWithPrices
  }

  constructWebhookEvent(payload: string | Buffer, signature: string, secret: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(payload, signature, secret)
  }

  private mapSubscriptionToDomain(subscription: Stripe.Subscription): StripeSubscription {
    const price = subscription.items.data[0].price
    const periodStart = (subscription as { current_period_start?: number }).current_period_start ?? 0
    const periodEnd = (subscription as { current_period_end?: number }).current_period_end ?? 0
    const cancelAtEnd = (subscription as { cancel_at_period_end?: boolean }).cancel_at_period_end ?? false
    return {
      id: subscription.id,
      customerId: subscription.customer as string,
      status: subscription.status,
      currentPeriodStart: new Date(periodStart * 1000),
      currentPeriodEnd: new Date(periodEnd * 1000),
      cancelAtPeriodEnd: cancelAtEnd,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : undefined,
      priceId: price.id,
      productId: price.product as string,
      interval: price.recurring?.interval ?? 'month',
      latestInvoiceId: subscription.latest_invoice as string | undefined
    }
  }

  private mapProductToDomain(product: Stripe.Product): StripeProduct {
    return {
      id: product.id,
      name: product.name,
      description: product.description ?? undefined,
      active: product.active,
      metadata: product.metadata
    }
  }

  private mapPriceToDomain(price: Stripe.Price): StripePrice {
    return {
      id: price.id,
      productId: price.product as string,
      unitAmount: price.unit_amount ?? 0,
      currency: price.currency,
      interval: (price.recurring?.interval as 'month' | 'year') ?? 'month',
      active: price.active
    }
  }
}
