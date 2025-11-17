import type {
  CheckoutSessionResult,
  CreateCheckoutSessionInput,
  CreateCustomerInput,
  StripeCustomer,
  StripeProductWithPrices,
  StripeSubscription,
  UpdateSubscriptionInput
} from './subscription-payment-gateway.types'

export interface SubscriptionPaymentGateway {
  createCustomer(input: CreateCustomerInput): Promise<StripeCustomer>
  createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CheckoutSessionResult>
  createBillingPortalSession(customerId: string, returnUrl: string): Promise<string>
  cancelSubscription(externalSubscriptionId: string, atPeriodEnd: boolean): Promise<void>
  updateSubscriptionPlan(input: UpdateSubscriptionInput): Promise<StripeSubscription>
  listActiveProducts(): Promise<StripeProductWithPrices[]>
  constructWebhookEvent(payload: string | Buffer, signature: string, secret: string): unknown
}
