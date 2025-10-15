import type { HttpClient } from '@/domain/http/http-client'
import type { RestaurantContactInfo } from '@/domain/models/restaurant.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateRestaurantContactInfoUsecaseInput extends RestaurantContactInfo {
  restaurantId: string
}

export class UpdateRestaurantContactInfoUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurant/:id/contact-info`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateRestaurantContactInfoUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: `${this.url.replace(':id', params.restaurantId)}`,
      body: {
        phone: params.phone,
        email: params.email,
        website: params.website,
        socialMedia: params.socialMedia
      }
    })
  }
}
