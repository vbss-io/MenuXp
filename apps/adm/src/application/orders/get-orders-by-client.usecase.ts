import type { HttpClient } from '@/domain/http/http-client'
import type { Order } from '@/domain/models/order.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetOrdersByClientUsecaseInput {
  clientId: string
  restaurantId: string
}

export class GetOrdersByClientUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/orders/client/:clientId/restaurant/:restaurantId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetOrdersByClientUsecaseInput): Promise<Order[]> {
    const url = this.url.replace(':clientId', params.clientId).replace(':restaurantId', params.restaurantId)
    const response = await this.httpClient.get<Order[]>({
      url
    })
    return response.data
  }
}
