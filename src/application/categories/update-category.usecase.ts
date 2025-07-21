import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateCategoryUsecaseInput {
  categoryId: string
  name?: string
  description?: string
  mainCategoryId?: string
  isActive?: boolean
}

export class UpdateCategoryUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/category/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateCategoryUsecaseInput): Promise<void> {
    const formData = new FormData()
    if (params.name) formData.append('name', params.name)
    if (params.description !== undefined) formData.append('description', params.description)
    if (params.mainCategoryId !== undefined) formData.append('mainCategoryId', params.mainCategoryId)
    if (params.isActive !== undefined) formData.append('isActive', params.isActive.toString())
    await this.httpClient.put({
      url: this.url.replace(':id', params.categoryId),
      body: formData
    })
  }
}
