import type { HttpClient } from '@/domain/http/http-client'
import type { MenuSectionConfig } from '@/domain/models/menu-layout.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface AddSectionUsecaseInput {
  layoutId: string
  section: {
    type: string
    config: MenuSectionConfig
  }
  position?: number
  files?: File[]
}

export interface AddSectionUsecaseOutput {
  success: boolean
  sectionId: string
}

export class AddSectionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/add`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: AddSectionUsecaseInput): Promise<AddSectionUsecaseOutput> {
    const formData = new FormData()
    formData.append('section', JSON.stringify(params.section))
    if (params.position !== undefined) {
      formData.append('position', params.position.toString())
    }
    if (params.files) {
      params.files.forEach((file) => {
        formData.append('files', file)
      })
    }
    const response = await this.httpClient.post<AddSectionUsecaseOutput>({
      url: this.url.replace(':layoutId', params.layoutId),
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}
