import type { HttpClient } from '@/domain/http/http-client'
import type { Order } from '@/domain/models/order.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetOrderBySlugAndCodeUsecaseInput {
  restaurantSlug: string
  orderCode: string
}

export class GetOrderBySlugAndCodeUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/order/slug/:restaurantSlug/code/:orderCode`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetOrderBySlugAndCodeUsecaseInput): Promise<Order> {
    const url = this.url.replace(':restaurantSlug', params.restaurantSlug).replace(':orderCode', params.orderCode)

    const response = await this.httpClient.get<Order>({
      url
    })
    return response.data
  }
}
