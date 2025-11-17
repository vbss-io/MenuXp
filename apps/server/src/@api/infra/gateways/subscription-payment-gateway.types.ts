export interface CreateCustomerInput {
  email: string
  name: string
  taxId?: string
  metadata?: Record<string, string>
}

export interface StripeCustomer {
  id: string
  email: string
  name: string
  taxId?: string
}

export interface CreateCheckoutSessionInput {
  customerId: string
  priceId: string
  successUrl: string
  cancelUrl: string
  locale?: string
  metadata?: Record<string, string>
  taxIdCollection?: boolean
  automaticTax?: boolean
}

export interface CheckoutSessionResult {
  sessionId: string
  url: string
}

export interface UpdateSubscriptionInput {
  externalSubscriptionId: string
  newPriceId: string
  prorationBehavior?: 'create_prorations' | 'none' | 'always_invoice'
}

export interface StripeSubscription {
  id: string
  customerId: string
  status: string
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  canceledAt?: Date
  priceId: string
  productId: string
  interval: string
  latestInvoiceId?: string
}

export interface StripePrice {
  id: string
  productId: string
  unitAmount: number
  currency: string
  interval: 'month' | 'year'
  active: boolean
}

export interface StripeProduct {
  id: string
  name: string
  description?: string
  active: boolean
  metadata: Record<string, string>
}

export interface StripeProductWithPrices {
  product: StripeProduct
  prices: StripePrice[]
}
