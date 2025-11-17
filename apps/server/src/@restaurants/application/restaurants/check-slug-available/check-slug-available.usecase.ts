import { inject } from '@api/infra/dependency-injection/registry'

import { CheckSlugType } from '@restaurants/application/restaurants/check-slug-available/check-slug-available.schema'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export interface CheckSlugAvailableUsecaseResult {
  slug: string
  available: boolean
}

export class CheckSlugAvailableUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute({ slug, restaurantId }: CheckSlugType): Promise<CheckSlugAvailableUsecaseResult> {
    const existingRestaurant = await this.RestaurantRepository.findOne({ slug })
    if (!existingRestaurant) {
      return { slug, available: true }
    }
    if (restaurantId && existingRestaurant.id === restaurantId) {
      return { slug, available: true }
    }
    return { slug, available: false }
  }
}
