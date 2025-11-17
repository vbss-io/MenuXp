import type { HttpClient } from '@/domain/http/http-client'
import type { CancelSubscriptionInput } from '@/domain/models/subscription.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CancelSubscriptionResponse {
  message: string
  canceledAt: string
  willCancelAtPeriodEnd: boolean
}

export class CancelSubscriptionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/subscriptions`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(input?: CancelSubscriptionInput): Promise<CancelSubscriptionResponse> {
    const { data } = await this.httpClient.delete<CancelSubscriptionResponse>({
      url: this.url,
      body: input
    })
    return data
  }
}
