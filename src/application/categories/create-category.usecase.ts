import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateCategoryUsecaseInput {
  name: string
  description?: string
  restaurantId?: string
  mainCategoryId?: string
  icon?: string
}

export interface CreateCategoryUsecaseOutput {
  id: string
}

export class CreateCategoryUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/category`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateCategoryUsecaseInput): Promise<CreateCategoryUsecaseOutput> {
    const formData = new FormData()
    formData.append('name', params.name)
    if (params.description) formData.append('description', params.description)
    if (params.restaurantId) formData.append('restaurantId', params.restaurantId)
    if (params.mainCategoryId) formData.append('mainCategoryId', params.mainCategoryId)
    if (params.icon) formData.append('icon', params.icon)
    const response = await this.httpClient.post<CreateCategoryUsecaseOutput>({
      url: this.url,
      body: formData
    })
    return response.data
  }
}
