import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateUserProfileUsecaseInput {
  name?: string
  files?: File[]
}

export interface UpdateUserProfileUsecaseOutput {
  avatar?: string
  name?: string
}

export class UpdateUserProfileUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/user/profile`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateUserProfileUsecaseInput): Promise<UpdateUserProfileUsecaseOutput> {
    const formData = new FormData()
    if (params.name) formData.append('name', params.name)
    if (params.files && params.files.length > 0) formData.append('files', params.files[0])
    const response = await this.httpClient.post<UpdateUserProfileUsecaseOutput>({
      url: this.url,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}
