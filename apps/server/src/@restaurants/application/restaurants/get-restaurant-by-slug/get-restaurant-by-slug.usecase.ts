import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantBySlugType } from '@restaurants/application/restaurants/get-restaurant-by-slug/get-restaurant-by-slug.schema'
import { Restaurant } from '@restaurants/domain/restaurants/restaurant.entity'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetRestaurantBySlugUsecaseInput = GetRestaurantBySlugType & {
  userId: string
}

export class GetRestaurantBySlugUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute({ userId, slug }: GetRestaurantBySlugUsecaseInput): Promise<Restaurant> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findOne({ slug })
    if (!restaurant) throw new NotFoundError('Restaurant', slug)
    return restaurant
  }
}
