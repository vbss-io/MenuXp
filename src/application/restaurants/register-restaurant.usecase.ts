import type { RestaurantDetails } from '@/domain/models/restaurant-details.model'

export interface RegisterRestaurantUsecaseInput extends Omit<RestaurantDetails, 'id'> {
  username: string
}

export class RegisterRestaurantUsecase {
  constructor() {}

  // async execute(input: RegisterRestaurantUsecaseInput): Promise<RestaurantDetails> {
  async execute(_input: RegisterRestaurantUsecaseInput): Promise<void> {
    return
  }
}
