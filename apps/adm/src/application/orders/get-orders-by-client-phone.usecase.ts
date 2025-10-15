import type { HttpClient } from '@/domain/http/http-client'
import type { Order } from '@/domain/models/order.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetOrdersByClientPhoneUsecaseInput {
  phone: string
  restaurantId: string
}

export class GetOrdersByClientPhoneUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/orders/phone/:phone/restaurant/:restaurantId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetOrdersByClientPhoneUsecaseInput): Promise<Order[]> {
    const url = this.url.replace(':phone', params.phone).replace(':restaurantId', params.restaurantId)
    const response = await this.httpClient.get<Order[]>({
      url
    })
    return response.data
  }
}
