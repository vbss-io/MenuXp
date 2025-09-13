import type { HttpClient } from '@/domain/http/http-client'
import type { Cart } from '@/domain/models/cart.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetCartUsecaseInput {
  clientId: string
  restaurantId: string
}

interface GetCartResponse {
  cart: Cart
}

export class GetCartUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/cart/:clientId/restaurant/:restaurantId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetCartUsecaseInput): Promise<Cart> {
    const url = this.url.replace(':clientId', params.clientId).replace(':restaurantId', params.restaurantId)
    const response = await this.httpClient.get<GetCartResponse>({
      url
    })
    return response.data.cart
  }
}
