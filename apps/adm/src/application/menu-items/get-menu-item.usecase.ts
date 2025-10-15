import type { HttpClient } from '@/domain/http/http-client'
import type { MenuItem } from '@/domain/models/menu-item.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetMenuItemUsecaseInput {
  menuItemId: string
}

export class GetMenuItemUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-item/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetMenuItemUsecaseInput): Promise<MenuItem> {
    const response = await this.httpClient.get<MenuItem>({
      url: this.url.replace(':id', params.menuItemId)
    })
    return response.data
  }
}
