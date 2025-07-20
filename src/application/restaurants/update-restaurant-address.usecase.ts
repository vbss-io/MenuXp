import type { HttpClient } from '@/domain/http/http-client'
import type { RestaurantAddress } from '@/domain/models/restaurant.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateRestaurantAddressUsecaseInput extends RestaurantAddress {
  restaurantId: string
}

export class UpdateRestaurantAddressUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurant/:id/address`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateRestaurantAddressUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: `${this.url.replace(':id', params.restaurantId)}`,
      body: {
        street: params.street,
        number: params.number,
        complement: params.complement,
        neighborhood: params.neighborhood,
        city: params.city,
        state: params.state,
        zipCode: params.zipCode,
        country: params.country
      }
    })
  }
}
