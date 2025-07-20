import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CheckSlugAvailableUsecaseInput {
  slug: string
  restaurantId?: string
}

export interface CheckSlugAvailableUsecaseOutput {
  slug: string
  available: boolean
}

export class CheckSlugAvailableUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurants/check-slug`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CheckSlugAvailableUsecaseInput): Promise<CheckSlugAvailableUsecaseOutput> {
    const queryParams = new URLSearchParams()
    queryParams.append('slug', params.slug)
    if (params.restaurantId) queryParams.append('restaurantId', params.restaurantId)
    const { data } = await this.httpClient.get<CheckSlugAvailableUsecaseOutput>({
      url: `${this.url}?${queryParams.toString()}`
    })
    return data
  }
}
