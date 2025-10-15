import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateMenuLayoutUsecaseInput {
  restaurantId: string
}

export interface CreateMenuLayoutUsecaseOutput {
  id: string
}

export class CreateMenuLayoutUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateMenuLayoutUsecaseInput): Promise<CreateMenuLayoutUsecaseOutput> {
    const response = await this.httpClient.post<CreateMenuLayoutUsecaseOutput>({
      url: this.url,
      body: {
        restaurantId: params.restaurantId
      }
    })
    return response.data
  }
}
