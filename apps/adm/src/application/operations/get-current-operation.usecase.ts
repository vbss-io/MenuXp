import type { HttpClient } from '@/domain/http/http-client'
import type { Operation } from '@/domain/models/operation.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetCurrentOperationUsecaseInput {
  restaurantId: string
}

export type GetCurrentOperationUsecaseOutput = Operation | null

interface OperationResponse {
  hasOperation: boolean
  operation?: Operation
}

export class GetCurrentOperationUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/operation/current`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetCurrentOperationUsecaseInput): Promise<GetCurrentOperationUsecaseOutput> {
    const response = await this.httpClient.get<OperationResponse>({
      url: this.url,
      params: {
        restaurantId: params.restaurantId
      }
    })
    if (!response.data.hasOperation) return null
    return response.data.operation ?? null
  }
}
