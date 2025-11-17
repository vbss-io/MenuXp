export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing' | 'incomplete'

export type BillingInterval = 'monthly' | 'yearly'

export type PaymentStatus = 'paid' | 'open' | 'void' | 'uncollectible'

export interface Invoice {
  id: string
  status: PaymentStatus
  amount: number
  currency: string
  dueDate: Date
  hostedInvoiceUrl: string | null
  invoicePdf: string | null
}

export interface PaymentMethod {
  type: string
  last4?: string
  brand?: string
  expirationMonth?: number
  expirationYear?: number
}

export interface Subscription {
  id: string
  planId: string
  status: SubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  canceledAt: Date | null
  billingCycle: BillingInterval
  externalSubscriptionId: string
  lastPaymentStatus?: PaymentStatus
  cancellationReason?: string
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionViewModel {
  subscription: Subscription | null
  plan: {
    code: string
    name: string
    price: number
    currency: string
    features: {
      menuItems: number | null
      monthlyOrders: number | null
      staffMembers: number
      customDomain: boolean
      removePoweredBy: boolean
      onlinePayment: boolean
      hasCoupons: boolean
      activeCoupons: number | null
      hasCampaigns: boolean
      hasAdvancedAnalytics: boolean
      menuLayouts: number
      maxStorage: number | null
    }
  } | null
  status: SubscriptionStatus | 'none'
  nextBillingDate: Date | null
  invoices: Invoice[]
  paymentMethod?: PaymentMethod
  canUpgrade: boolean
  canDowngrade: boolean
  canCancel: boolean
  billingPortalUrl?: string
}

export interface CreateCheckoutSessionInput {
  planCode: string
  billingCycle: BillingInterval
}

export interface CreateCheckoutSessionResponse {
  url: string
  sessionId: string
}

export interface UpdateSubscriptionInput {
  planCode: string
  billingCycle?: BillingInterval
}

export interface CancelSubscriptionInput {
  reason?: string
  cancelImmediately?: boolean
}
