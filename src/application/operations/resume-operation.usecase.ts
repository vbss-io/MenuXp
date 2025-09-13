import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ResumeOperationUsecaseInput {
  operationId: string
}

export class ResumeOperationUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/operation/:id/resume`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: ResumeOperationUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url.replace(':id', params.operationId)
    })
  }
}
