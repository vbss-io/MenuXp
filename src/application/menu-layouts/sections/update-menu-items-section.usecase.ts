import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateMenuItemsSectionUsecaseInput {
  layoutId: string
  sectionId: string
  menuItemIds: string[] | null
}

export interface UpdateMenuItemsSectionUsecaseOutput {
  success: boolean
  sectionId: string
}

export class UpdateMenuItemsSectionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/:sectionId/menu-items`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateMenuItemsSectionUsecaseInput): Promise<UpdateMenuItemsSectionUsecaseOutput> {
    const response = await this.httpClient.put<UpdateMenuItemsSectionUsecaseOutput>({
      url: this.url.replace(':layoutId', params.layoutId).replace(':sectionId', params.sectionId),
      body: {
        menuItemIds: params.menuItemIds
      }
    })
    return response.data
  }
}
