import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantMenuCategoriesType } from '@customers/application/menu/categories/get-restaurant-menu-categories/get-restaurant-menu-categories.schema'

import type { Category } from '@restaurants/domain/categories/category.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export class GetRestaurantMenuCategoriesUsecase {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute(input: GetRestaurantMenuCategoriesType): Promise<Category[]> {
    const { restaurantId, categoryIds } = input
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    const categories = await this.CategoryRepository.find({
      restaurantId,
      isActive: true
    })
    let mainCategories = categories.filter((category) => !category.mainCategoryId)
    if (categoryIds && categoryIds.length > 0) {
      mainCategories = mainCategories.filter((category) => categoryIds.includes(category.id as string))
    }
    return mainCategories
  }
}
