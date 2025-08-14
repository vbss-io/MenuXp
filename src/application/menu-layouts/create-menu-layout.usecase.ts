import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateMenuLayoutUsecaseInput {
  restaurantId: string
  name: string
  description?: string
  sections?: Array<{
    type: string
    order: number
    config: Record<string, unknown>
  }>
  files?: File[]
}

export interface CreateMenuLayoutUsecaseOutput {
  id: string
}

export class CreateMenuLayoutUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateMenuLayoutUsecaseInput): Promise<CreateMenuLayoutUsecaseOutput> {
    const formData = new FormData()
    formData.append('restaurantId', params.restaurantId)
    formData.append('name', params.name)
    if (params.description) formData.append('description', params.description)
    if (params.sections) formData.append('sections', JSON.stringify(params.sections))
    if (params.files) {
      params.files.forEach((file) => {
        formData.append('files', file)
      })
    }
    const response = await this.httpClient.post<CreateMenuLayoutUsecaseOutput>({
      url: this.url,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}
