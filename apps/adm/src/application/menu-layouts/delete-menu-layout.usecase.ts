import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteMenuLayoutUsecaseInput {
  layoutId: string
}

export class DeleteMenuLayoutUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteMenuLayoutUsecaseInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url.replace(':id', params.layoutId)
    })
  }
}
