import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantByIdType } from '@restaurants/application/restaurants/get-restaurant-by-id/get-restaurant-by-id.schema'
import { Restaurant } from '@restaurants/domain/restaurants/restaurant.entity'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetRestaurantByIdUsecaseInput = GetRestaurantByIdType & {
  userId: string
}

export class GetRestaurantByIdUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute({ userId, restaurantId }: GetRestaurantByIdUsecaseInput): Promise<Restaurant> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to get restaurant')
    return restaurant
  }
}
