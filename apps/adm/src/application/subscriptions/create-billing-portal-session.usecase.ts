import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateBillingPortalSessionResponse {
  url: string
}

export class CreateBillingPortalSessionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/subscriptions/billing-portal`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(): Promise<CreateBillingPortalSessionResponse> {
    const { data } = await this.httpClient.post<CreateBillingPortalSessionResponse>({
      url: this.url
    })
    return data
  }
}
