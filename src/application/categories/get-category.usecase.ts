import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'
import type { Category } from '@/domain/models/category.model'

export interface GetCategoryUsecaseInput {
  categoryId: string
}

export class GetCategoryUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/category/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetCategoryUsecaseInput): Promise<Category> {
    const response = await this.httpClient.get<Category>({
      url: this.url.replace(':id', params.categoryId)
    })
    return response.data
  }
}
