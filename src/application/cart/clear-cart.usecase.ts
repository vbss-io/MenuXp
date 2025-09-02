import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ClearCartUsecaseInput {
  clientId: string
  restaurantId: string
}

export interface ClearCartUsecaseOutput {
  success: boolean
  message?: string
}

export class ClearCartUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/cart/clear`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: ClearCartUsecaseInput): Promise<ClearCartUsecaseOutput> {
    const response = await this.httpClient.delete<ClearCartUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
