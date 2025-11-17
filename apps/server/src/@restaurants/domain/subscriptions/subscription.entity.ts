import { Observable } from '@api/infra/events/observer'
import type { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import type { PlanFeatures } from '@restaurants/domain/plans/plan.entity'
import type { BillingCycle } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'
import { SubscriptionStatus } from '@restaurants/domain/subscriptions/enums/subscription-status.enum'
import { PaymentConfirmed } from '@restaurants/domain/subscriptions/events/payment-confirmed.event'

export class Subscription extends Observable {
  userId: string
  planId: string
  status: SubscriptionStatus
  startDate: Date
  endDate?: Date
  nextBillingDate: Date
  billingCycle: BillingCycle
  planMetadata: {
    name: string
    code: PlanCode
    price: number
    currency: string
    features: PlanFeatures
  }
  externalSubscriptionId?: string
  latestInvoiceId?: string
  lastPaymentStatus?: string
  invoicePdf?: string
  invoicePdfHosted?: string
  cancelledAt?: Date
  cancelledReason?: string

  private constructor(
    readonly id: string | undefined,
    userId: string,
    planId: string,
    status: SubscriptionStatus,
    startDate: Date,
    endDate: Date | undefined,
    nextBillingDate: Date,
    billingCycle: BillingCycle,
    planMetadata: {
      name: string
      code: PlanCode
      price: number
      currency: string
      features: PlanFeatures
    },
    externalSubscriptionId: string | undefined,
    latestInvoiceId: string | undefined,
    lastPaymentStatus: string | undefined,
    invoicePdf: string | undefined,
    invoicePdfHosted: string | undefined,
    cancelledAt: Date | undefined,
    cancelledReason: string | undefined,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    super()
    this.userId = userId
    this.planId = planId
    this.status = status
    this.startDate = startDate
    this.endDate = endDate
    this.nextBillingDate = nextBillingDate
    this.billingCycle = billingCycle
    this.planMetadata = planMetadata
    this.externalSubscriptionId = externalSubscriptionId
    this.latestInvoiceId = latestInvoiceId
    this.lastPaymentStatus = lastPaymentStatus
    this.invoicePdf = invoicePdf
    this.invoicePdfHosted = invoicePdfHosted
    this.cancelledAt = cancelledAt
    this.cancelledReason = cancelledReason
  }

  static create(input: CreateSubscription): Subscription {
    const nextBillingDate = Subscription.calculateNextBillingDate(input.startDate, input.billingCycle)
    return new Subscription(
      undefined,
      input.userId,
      input.planId,
      input.status,
      input.startDate,
      undefined,
      nextBillingDate,
      input.billingCycle,
      input.planMetadata,
      input.externalSubscriptionId,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static restore(input: RestoreSubscription): Subscription {
    return new Subscription(
      input.id,
      input.userId,
      input.planId,
      input.status,
      input.startDate,
      input.endDate,
      input.nextBillingDate,
      input.billingCycle,
      input.planMetadata,
      input.externalSubscriptionId,
      input.latestInvoiceId,
      input.lastPaymentStatus,
      input.invoicePdf,
      input.invoicePdfHosted,
      input.cancelledAt,
      input.cancelledReason,
      input.createdAt,
      input.updatedAt
    )
  }

  private static calculateNextBillingDate(startDate: Date, billingCycle: 'monthly' | 'yearly'): Date {
    const nextDate = new Date(startDate)
    if (billingCycle === 'monthly') {
      nextDate.setMonth(nextDate.getMonth() + 1)
    } else {
      nextDate.setFullYear(nextDate.getFullYear() + 1)
    }
    return nextDate
  }

  activate(): void {
    this.status = SubscriptionStatus.ACTIVE
  }

  async notifyPaymentConfirmed(username: string, email: string): Promise<void> {
    await this.notify(new PaymentConfirmed({ subscriptionId: this.id as string, username, email }))
  }

  suspend(): void {
    this.status = SubscriptionStatus.SUSPENDED
  }

  cancel(reason?: string): void {
    this.status = SubscriptionStatus.CANCELLED
    this.cancelledAt = new Date()
    this.cancelledReason = reason
    this.endDate = new Date()
  }

  expire(): void {
    this.status = SubscriptionStatus.EXPIRED
    this.endDate = new Date()
  }

  isActive(): boolean {
    return this.status === SubscriptionStatus.ACTIVE
  }

  isCancelled(): boolean {
    return this.status === SubscriptionStatus.CANCELLED
  }

  isExpired(): boolean {
    return this.status === SubscriptionStatus.EXPIRED || (this.endDate ? this.endDate < new Date() : false)
  }

  getCurrentFeatures(): PlanFeatures {
    return this.planMetadata.features
  }

  setExternalSubscriptionId(externalSubscriptionId: string): void {
    this.externalSubscriptionId = externalSubscriptionId
  }

  setInvoices(invoicePdf: string, invoicePdfHosted: string): void {
    this.invoicePdf = invoicePdf
    this.invoicePdfHosted = invoicePdfHosted
  }

  setLatestInvoice(invoiceId: string): void {
    this.latestInvoiceId = invoiceId
  }

  setPaymentStatus(status: string): void {
    this.lastPaymentStatus = status
  }

  updateFromStripeSubscription(stripeData: {
    status?: string
    currentPeriodEnd?: Date
    latestInvoiceId?: string
  }): void {
    if (stripeData.status === 'active') {
      this.activate()
    } else if (stripeData.status === 'canceled') {
      this.cancel()
    }
    if (stripeData.currentPeriodEnd) {
      this.nextBillingDate = stripeData.currentPeriodEnd
    }
    if (stripeData.latestInvoiceId) {
      this.latestInvoiceId = stripeData.latestInvoiceId
    }
  }
}

export interface CreateSubscription {
  userId: string
  planId: string
  status: SubscriptionStatus
  startDate: Date
  billingCycle: BillingCycle
  planMetadata: {
    name: string
    code: PlanCode
    price: number
    currency: string
    features: PlanFeatures
  }
  externalSubscriptionId?: string
}

type RestoreSubscription = CreateSubscription & {
  id: string
  endDate?: Date
  nextBillingDate: Date
  latestInvoiceId?: string
  lastPaymentStatus?: string
  invoicePdf?: string
  invoicePdfHosted?: string
  cancelledAt?: Date
  cancelledReason?: string
  createdAt: Date
  updatedAt: Date
}
