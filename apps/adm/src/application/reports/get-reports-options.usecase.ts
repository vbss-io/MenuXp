import type { HttpClient } from '@/domain/http/http-client'
import type { GetReportsOptionsResponse } from '@/domain/models/reports.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetReportsOptionsUsecaseInput {
  restaurantId: string
}

export class GetReportsOptionsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/reports/options`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetReportsOptionsUsecaseInput): Promise<GetReportsOptionsResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('restaurantId', params.restaurantId)
    const response = await this.httpClient.get<GetReportsOptionsResponse>({
      url: `${this.url}?${queryParams.toString()}`
    })
    return response.data
  }
}
