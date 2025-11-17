import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import {
  CategoryName,
  GetCategoriesNamesQuery
} from '@restaurants/application/categories/@queries/get-categories-names.query'
import { GetCategoriesType } from '@restaurants/application/categories/get-categories/get-categories.schema'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetCategoriesNamesUsecaseInput = GetCategoriesType & {
  userId: string
}

export class GetCategoriesNamesUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('GetCategoriesNamesQuery')
  private readonly GetCategoriesNamesQuery!: GetCategoriesNamesQuery

  async execute({ userId, restaurantId, ...input }: GetCategoriesNamesUsecaseInput): Promise<CategoryName[]> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to get categories names')
    const categoriesNames = await this.GetCategoriesNamesQuery.execute({
      restaurantId,
      ...input
    })
    return categoriesNames
  }
}
