import type { HttpClient } from '@/domain/http/http-client'
import type { CategoryOptional } from '@/domain/models/category.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateCategoryUsecaseInput {
  categoryId: string
  name: string
  description?: string
  mainCategoryId?: string
  icon?: string
  optionals?: CategoryOptional[]
}

export class UpdateCategoryUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/category/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateCategoryUsecaseInput): Promise<void> {
    const formData = new FormData()
    formData.append('name', params.name)
    if (params.description !== undefined) formData.append('description', params.description)
    if (params.mainCategoryId !== undefined) formData.append('mainCategoryId', params.mainCategoryId)
    if (params.icon !== undefined) formData.append('icon', params.icon)
    if (params.optionals) formData.append('optionals', JSON.stringify(params.optionals))
    await this.httpClient.put({
      url: this.url.replace(':id', params.categoryId),
      body: formData
    })
  }
}
