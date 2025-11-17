import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCategoryType } from '@restaurants/application/categories/get-category/get-category.schema'
import { Category } from '@restaurants/domain/categories/category.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetCategoryUsecaseInput = GetCategoryType & {
  userId: string
}

export type GetCategoryUsecaseOutput = Partial<Category> & {
  subCategories: Category[]
}

export class GetCategoryUsecase {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute(input: GetCategoryUsecaseInput): Promise<GetCategoryUsecaseOutput> {
    const { userId, categoryId } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const category = await this.CategoryRepository.findById(categoryId)
    if (!category) throw new NotFoundError('Category', categoryId)
    const restaurant = await this.RestaurantRepository.findById(category.restaurantId as string)
    if (!restaurant) throw new NotFoundError('Restaurant', category.restaurantId as string)
    let subCategories
    if (category.isMainCategory()) {
      subCategories = await this.CategoryRepository.find({
        mainCategoryId: categoryId,
        isActive: true
      })
    }
    return {
      ...category,
      subCategories: subCategories ?? []
    }
  }
}
