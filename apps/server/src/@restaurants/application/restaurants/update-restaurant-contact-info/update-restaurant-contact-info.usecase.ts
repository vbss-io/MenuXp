import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateRestaurantContactInfoType } from '@restaurants/application/restaurants/update-restaurant-contact-info/update-restaurant-contact-info.schema'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateRestaurantContactInfoUsecaseInput = UpdateRestaurantContactInfoType & {
  userId: string
}

export class UpdateRestaurantContactInfoUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId, restaurantId, ...contactInfoData }: UpdateRestaurantContactInfoUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to update restaurant')
    restaurant.updateContactInfo(contactInfoData)
    await this.RestaurantRepository.update({ id: restaurantId }, restaurant)
  }
}
