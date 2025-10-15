import type { HttpClient } from '@/domain/http/http-client'
import type { OrderStatus } from '@/domain/models/order.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateOrderUsecaseInput {
  orderId: string
  status: OrderStatus
}

export class UpdateOrderUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/order/:orderId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateOrderUsecaseInput): Promise<void> {
    await this.httpClient.put({
      url: this.url.replace(':orderId', params.orderId),
      body: {
        status: params.status
      }
    })
  }
}
