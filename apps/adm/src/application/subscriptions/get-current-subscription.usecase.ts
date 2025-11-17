import type { HttpClient } from '@/domain/http/http-client'
import type { SubscriptionViewModel } from '@/domain/models/subscription.model'
import { Registry } from '@/infra/dependency-injection/registry'

export class GetCurrentSubscriptionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/subscription`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(): Promise<SubscriptionViewModel> {
    const { data } = await this.httpClient.get<SubscriptionViewModel>({
      url: this.url
    })
    return data
  }
}
