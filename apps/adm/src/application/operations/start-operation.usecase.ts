import type { HttpClient } from '@/domain/http/http-client'
import type { CreateOperationRequest, OperationResponse } from '@/domain/models/operation.model'
import { Registry } from '@/infra/dependency-injection/registry'

export class StartOperationUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/operation/start`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateOperationRequest): Promise<OperationResponse> {
    const response = await this.httpClient.post<OperationResponse>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
