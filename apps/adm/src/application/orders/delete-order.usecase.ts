import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteOrderUsecaseInput {
  orderId: string
}

export class DeleteOrderUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/order/:orderId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteOrderUsecaseInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url.replace(':orderId', params.orderId)
    })
  }
}
