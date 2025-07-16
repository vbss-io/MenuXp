import type { HttpClient } from '@/domain/http/http-client'
import type { Restaurant } from '@/domain/models/restaurant.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantByIdUsecaseInput {
  id: string
}

export class GetRestaurantByIdUsecase {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute({ id }: GetRestaurantByIdUsecaseInput): Promise<Restaurant | null> {
    const { data } = await this.httpClient.get<Restaurant>({
      url: `${import.meta.env.VITE_BACKEND}/restaurants/${id}`
    })
    return data
  }
}
