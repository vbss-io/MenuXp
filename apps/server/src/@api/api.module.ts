import { StatusModule } from '@api/application/status/status.module'
import { StripeWebhookModule } from '@api/application/webhooks/stripe/stripe-webhook.module'

export class ApiModule {
  constructor() {
    new StatusModule()
    new StripeWebhookModule()
  }
}
