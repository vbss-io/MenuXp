import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateRestaurantBasicInfoUsecaseInput {
  restaurantId: string
  name: string
  description: string
  slug: string
  primaryColor?: string
  secondaryColor?: string
  files?: File[]
}

export class UpdateRestaurantBasicInfoUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurant/:id/basic-info`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateRestaurantBasicInfoUsecaseInput): Promise<void> {
    const formData = new FormData()
    formData.append('name', params.name)
    formData.append('description', params.description)
    formData.append('slug', params.slug)
    if (params.primaryColor) formData.append('primaryColor', params.primaryColor)
    if (params.secondaryColor) formData.append('secondaryColor', params.secondaryColor)
    if (params.files && params.files.length > 0) formData.append('files', params.files[0])
    await this.httpClient.patch({
      url: `${this.url.replace(':id', params.restaurantId)}`,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
