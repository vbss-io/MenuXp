import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateCarouselSectionUsecaseInput {
  layoutId: string
  sectionId: string
  removeMedias?: string[]
  files?: File[]
}

export interface UpdateCarouselSectionUsecaseOutput {
  success: boolean
  sectionId: string
}

export class UpdateCarouselSectionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/:sectionId/carousel`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateCarouselSectionUsecaseInput): Promise<UpdateCarouselSectionUsecaseOutput> {
    const formData = new FormData()
    if (params.removeMedias && params.removeMedias.length > 0) {
      formData.append('removeMedias', JSON.stringify(params.removeMedias))
    }
    if (params.files) {
      params.files.forEach((file) => {
        formData.append('files', file)
      })
    }
    const response = await this.httpClient.put<UpdateCarouselSectionUsecaseOutput>({
      url: this.url.replace(':layoutId', params.layoutId).replace(':sectionId', params.sectionId),
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}
