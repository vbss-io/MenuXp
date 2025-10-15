import type { HttpClient } from '@/domain/http/http-client'
import type { Order } from '@/domain/models/order.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetOrderUsecaseInput {
  orderId: string
}

export class GetOrderUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/order/:orderId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetOrderUsecaseInput): Promise<Order> {
    const response = await this.httpClient.get<Order>({
      url: this.url.replace(':orderId', params.orderId)
    })
    return response.data
  }
}
