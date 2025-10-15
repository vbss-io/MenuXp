import { ConflictError } from '@api/domain/errors/conflict.error'
import { ForbiddenError } from '@api/domain/errors/forbidden.error'
import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import { CreateCategoryType } from '@restaurants/application/categories/create-category/create-category.schema'
import { Category } from '@restaurants/domain/categories/category.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type CreateCategoryUsecaseInput = CreateCategoryType & {
  userId: string
}

export class CreateCategoryUsecase {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute(input: CreateCategoryUsecaseInput): Promise<Category> {
    const { userId, restaurantId, mainCategoryId, ...categoryData } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to create category')
    if (mainCategoryId) {
      const mainCategory = await this.CategoryRepository.findById(mainCategoryId)
      if (!mainCategory || mainCategory.restaurantId !== restaurantId) {
        throw new NotFoundError('MainCategory', mainCategoryId)
      }
    }
    const existingCategory = await this.CategoryRepository.findOne({
      restaurantId,
      name: categoryData.name
    })
    if (existingCategory) throw new ConflictError('Category already exists')
    const category = Category.create({
      ...categoryData,
      restaurantId,
      mainCategoryId,
      optionals: input.optionals || []
    })
    return await this.CategoryRepository.create(category)
  }
}
