import type { HttpClient } from '@/domain/http/http-client'
import type { MenuLayout } from '@/domain/models/menu-layout.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetMenuLayoutUsecaseInput {
  layoutId: string
}

export class GetMenuLayoutUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetMenuLayoutUsecaseInput): Promise<MenuLayout> {
    const response = await this.httpClient.get<MenuLayout>({
      url: this.url.replace(':id', params.layoutId)
    })
    return response.data
  }
}
