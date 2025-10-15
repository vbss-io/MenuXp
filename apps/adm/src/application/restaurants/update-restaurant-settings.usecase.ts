import type { HttpClient } from '@/domain/http/http-client'
import type { RestaurantSettings } from '@/domain/models/restaurant.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateRestaurantSettingsUsecaseInput extends RestaurantSettings {
  restaurantId: string
}

export class UpdateRestaurantSettingsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurant/:id/settings`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateRestaurantSettingsUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: `${this.url.replace(':id', params.restaurantId)}`,
      body: {
        operationTypes: params.operationTypes,
        paymentMethods: params.paymentMethods,
        deliveryFee: params.deliveryFee,
        acceptsScheduling: params.acceptsScheduling,
        businessHours: params.businessHours,
        templates: params.templates
      }
    })
  }
}
