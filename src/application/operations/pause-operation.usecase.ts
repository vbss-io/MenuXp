import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface PauseOperationUsecaseInput {
  operationId: string
}

export class PauseOperationUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/operation/:id/pause`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: PauseOperationUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url.replace(':id', params.operationId)
    })
  }
}
