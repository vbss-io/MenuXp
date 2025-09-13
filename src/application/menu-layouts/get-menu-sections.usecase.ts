import type { HttpClient } from '@/domain/http/http-client'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { Registry } from '@/infra/dependency-injection/registry'

export class GetMenuSectionsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layout-sections`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(): Promise<MenuSectionDefinition[]> {
    const response = await this.httpClient.get<MenuSectionDefinition[]>({
      url: this.url
    })
    return response.data
  }
}
