import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateMenuLayoutUsecaseInput {
  layoutId: string
  name?: string
  description?: string
  layout?: string
}

export interface UpdateMenuLayoutUsecaseOutput {
  id: string
}

export class UpdateMenuLayoutUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:id/basic-info`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateMenuLayoutUsecaseInput): Promise<UpdateMenuLayoutUsecaseOutput> {
    const body: Record<string, unknown> = {}
    if (params.name) body.name = params.name
    if (params.description) body.description = params.description
    if (params.layout) body.layout = params.layout
    const response = await this.httpClient.put<UpdateMenuLayoutUsecaseOutput>({
      url: this.url.replace(':id', params.layoutId),
      body
    })
    return response.data
  }
}
