import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCategoryType } from '@restaurants/application/categories/get-category/get-category.schema'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ToggleCategoryStatusUsecaseInput = GetCategoryType & {
  userId: string
}

export class ToggleCategoryStatusUsecase {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute(input: ToggleCategoryStatusUsecaseInput): Promise<void> {
    const { userId, categoryId } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const category = await this.CategoryRepository.findById(categoryId)
    if (!category) throw new NotFoundError('Category', categoryId)
    const restaurant = await this.RestaurantRepository.findById(category.restaurantId as string)
    if (!restaurant) throw new NotFoundError('Restaurant', category.restaurantId as string)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to toggle category status')
    if (category.isActive) {
      category.deactivate()
    } else {
      category.activate()
    }
    await this.CategoryRepository.update({ id: categoryId }, category)
  }
}
