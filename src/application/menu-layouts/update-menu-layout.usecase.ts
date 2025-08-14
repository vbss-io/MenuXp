import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateMenuLayoutUsecaseSection {
  id?: string
  type: string
  config: Record<string, unknown>
}

export interface UpdateMenuLayoutUsecaseInput {
  layoutId: string
  name?: string
  description?: string
  sections?: Array<UpdateMenuLayoutUsecaseSection>
  files?: File[]
  removeMedias?: string[]
}

export interface UpdateMenuLayoutUsecaseOutput {
  id: string
}

export class UpdateMenuLayoutUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateMenuLayoutUsecaseInput): Promise<UpdateMenuLayoutUsecaseOutput> {
    const formData = new FormData()
    if (params.name) {
      formData.append('name', params.name)
    }
    if (params.description) {
      formData.append('description', params.description)
    }
    if (params.sections) {
      formData.append('sections', JSON.stringify(params.sections))
    }
    if (params.files) {
      params.files.forEach((file) => {
        formData.append('files', file)
      })
    }
    if (params.removeMedias && params.removeMedias.length > 0) {
      formData.append('removeMedias', JSON.stringify(params.removeMedias))
    }
    const response = await this.httpClient.put<UpdateMenuLayoutUsecaseOutput>({
      url: this.url.replace(':id', params.layoutId),
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}
