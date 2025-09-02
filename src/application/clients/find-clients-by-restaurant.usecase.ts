import type { HttpClient } from '@/domain/http/http-client'
import type { Client } from '@/domain/models/client.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface FindClientsByRestaurantUsecaseInput {
  restaurantId: string
}

export class FindClientsByRestaurantUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/clients/restaurant/:restaurantId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: FindClientsByRestaurantUsecaseInput): Promise<Client[]> {
    const url = this.url.replace(':restaurantId', params.restaurantId)
    const response = await this.httpClient.get<Client[]>({
      url
    })
    return response.data
  }
}
