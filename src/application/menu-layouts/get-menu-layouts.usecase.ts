import type { HttpClient } from '@/domain/http/http-client'
import type { MenuLayout } from '@/domain/models/menu-layout.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetMenuLayoutsUsecaseInput {
  restaurantId: string
}

export class GetMenuLayoutsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetMenuLayoutsUsecaseInput): Promise<MenuLayout[]> {
    const response = await this.httpClient.get<MenuLayout[]>({
      url: `${import.meta.env.VITE_BACKEND}/menu-layouts/restaurant/${params.restaurantId}`
    })
    return response.data
  }
}
