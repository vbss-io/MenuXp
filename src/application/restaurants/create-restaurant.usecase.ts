import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateRestaurantUsecaseInput {
  name: string
  description: string
  slug: string
  files?: File[]
}

export interface CreateRestaurantUsecaseOutput {
  id: string
}

export class CreateRestaurantUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurant`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateRestaurantUsecaseInput): Promise<CreateRestaurantUsecaseOutput> {
    const formData = new FormData()
    formData.append('name', params.name)
    formData.append('description', params.description)
    formData.append('slug', params.slug)
    if (params.files && params.files.length > 0) formData.append('files', params.files[0])
    const { data } = await this.httpClient.post<CreateRestaurantUsecaseOutput>({
      url: this.url,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  }
}
