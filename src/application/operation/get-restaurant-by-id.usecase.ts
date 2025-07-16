import type { HttpClient } from '@/domain/http/http-client'
import type { Restaurant } from '@/domain/models/restaurant.model'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantByIdUsecaseInput {
  id: string
}

export class GetRestaurantByIdUsecase {
  private readonly httpClient: HttpClient
  private readonly localStorage: LocalStorage

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  async execute({ id }: GetRestaurantByIdUsecaseInput): Promise<Restaurant | null> {
    const restaurants = this.localStorage.get<Restaurant[]>('restaurants') || []
    const found = restaurants.find((r) => r.id === id)
    if (found) return found
    return null
    // const { data } = await this.httpClient.get<Restaurant>({
    //   url: `${import.meta.env.VITE_BACKEND}/restaurants/${id}`
    // })
    // return data
  }
}
