import type { HttpClient } from '@/domain/http/http-client'
import type { AbandonedCart } from '@/domain/models/cart.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetAbandonedCartsUsecaseInput {
  restaurantId: string
  hoursThreshold?: number
}

export class GetAbandonedCartsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/cart/abandoned/:restaurantId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetAbandonedCartsUsecaseInput): Promise<AbandonedCart[]> {
    const url = this.url.replace(':restaurantId', params.restaurantId)
    const queryParams = new URLSearchParams()

    if (params.hoursThreshold) {
      queryParams.append('hoursThreshold', params.hoursThreshold.toString())
    }

    const fullUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url

    const response = await this.httpClient.get<AbandonedCart[]>({
      url: fullUrl
    })
    return response.data
  }
}
