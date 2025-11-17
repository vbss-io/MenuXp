import type { DomainEvent } from '@api/infra/events/domain-event'

import { SUBSCRIPTION_PAYMENT_CONFIRMED } from '@restaurants/domain/subscriptions/consts/subscription-events.const'

export interface PaymentConfirmedData {
  subscriptionId: string
  username: string
  email: string
}

export class PaymentConfirmed implements DomainEvent<PaymentConfirmedData> {
  eventName = SUBSCRIPTION_PAYMENT_CONFIRMED.eventName

  constructor(readonly data: PaymentConfirmedData) {}
}
