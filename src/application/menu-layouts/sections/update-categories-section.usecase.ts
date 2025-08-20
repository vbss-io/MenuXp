import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateCategoriesSectionUsecaseInput {
  layoutId: string
  sectionId: string
  categoryIds: string[] | null
}

export interface UpdateCategoriesSectionUsecaseOutput {
  success: boolean
  sectionId: string
}

export class UpdateCategoriesSectionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/:sectionId/categories`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateCategoriesSectionUsecaseInput): Promise<UpdateCategoriesSectionUsecaseOutput> {
    const response = await this.httpClient.put<UpdateCategoriesSectionUsecaseOutput>({
      url: this.url.replace(':layoutId', params.layoutId).replace(':sectionId', params.sectionId),
      body: {
        categoryIds: params.categoryIds
      }
    })
    return response.data
  }
}
