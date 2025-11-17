import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateSubscriptionPlanInput {
  planCode: string
}

export interface UpdateSubscriptionPlanResponse {
  success: boolean
  message: string
}

export class UpdateSubscriptionPlanUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/subscriptions/plan`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(input: UpdateSubscriptionPlanInput): Promise<UpdateSubscriptionPlanResponse> {
    const { data } = await this.httpClient.patch<UpdateSubscriptionPlanResponse>({
      url: this.url,
      body: input
    })
    return data
  }
}
