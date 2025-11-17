import type { HttpClient } from '@/domain/http/http-client'
import type { CreateCheckoutSessionInput, CreateCheckoutSessionResponse } from '@/domain/models/subscription.model'
import { Registry } from '@/infra/dependency-injection/registry'

export class CreateCheckoutSessionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/subscriptions/checkout-session`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResponse> {
    const { data } = await this.httpClient.post<CreateCheckoutSessionResponse>({
      url: this.url,
      body: input
    })
    return data
  }
}
