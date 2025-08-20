import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateBannerSectionUsecaseInput {
  layoutId: string
  sectionId: string
  files?: File[]
}

export interface UpdateBannerSectionUsecaseOutput {
  success: boolean
  sectionId: string
}

export class UpdateBannerSectionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/:sectionId/banner`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateBannerSectionUsecaseInput): Promise<UpdateBannerSectionUsecaseOutput> {
    const formData = new FormData()
    if (params.files && params.files.length > 0) {
      formData.append('files', params.files[0])
    }
    const response = await this.httpClient.put<UpdateBannerSectionUsecaseOutput>({
      url: this.url.replace(':layoutId', params.layoutId).replace(':sectionId', params.sectionId),
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}
