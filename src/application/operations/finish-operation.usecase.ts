import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface FinishOperationUsecaseInput {
  operationId: string
}

export class FinishOperationUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/operation/:id/finish`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: FinishOperationUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url.replace(':id', params.operationId)
    })
  }
}
