import type { HttpClient } from '@/domain/http/http-client'
import type { Restaurant } from '@/domain/models/restaurant.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantByIdUsecaseInput {
  restaurantId: string
}

export interface RestaurantConfigValidation {
  hasAddress: boolean
  hasContactInfo: boolean
  hasOperationSettings: boolean
  hasOperationHours: boolean
  hasTemplates: boolean
  missingConfigs: string[]
  isReadyForOperation: boolean
}

export class GetRestaurantByIdUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurant/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetRestaurantByIdUsecaseInput): Promise<Restaurant> {
    const response = await this.httpClient.get<Restaurant>({
      url: this.url.replace(':id', params.restaurantId)
    })
    const restaurant = response.data
    return restaurant
  }
}
