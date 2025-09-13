import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ActivateMenuLayoutUsecaseInput {
  layoutId: string
}

export interface ActivateMenuLayoutUsecaseOutput {
  id: string
}

export class ActivateMenuLayoutUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:id/activate`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: ActivateMenuLayoutUsecaseInput): Promise<ActivateMenuLayoutUsecaseOutput> {
    const response = await this.httpClient.post<ActivateMenuLayoutUsecaseOutput>({
      url: this.url.replace(':id', params.layoutId)
    })
    return response.data
  }
}
