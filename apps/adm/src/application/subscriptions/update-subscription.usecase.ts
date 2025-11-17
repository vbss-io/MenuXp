import type { HttpClient } from '@/domain/http/http-client'
import type { UpdateSubscriptionInput } from '@/domain/models/subscription.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateSubscriptionResponse {
  message: string
  pendingUpdate: boolean
}

export class UpdateSubscriptionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/subscriptions`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(input: UpdateSubscriptionInput): Promise<UpdateSubscriptionResponse> {
    const { data } = await this.httpClient.patch<UpdateSubscriptionResponse>({
      url: this.url,
      body: input
    })
    return data
  }
}
