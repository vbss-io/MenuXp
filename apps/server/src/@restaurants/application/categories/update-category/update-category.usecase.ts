import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateCategoryType } from '@restaurants/application/categories/update-category/update-category.schema'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateCategoryUsecaseInput = UpdateCategoryType & {
  userId: string
}

export class UpdateCategoryUsecase {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute(input: UpdateCategoryUsecaseInput): Promise<void> {
    const { userId, categoryId, mainCategoryId, ...categoryData } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const category = await this.CategoryRepository.findById(categoryId)
    if (!category) throw new NotFoundError('Category', categoryId)
    const restaurant = await this.RestaurantRepository.findById(category.restaurantId as string)
    if (!restaurant) throw new NotFoundError('Restaurant', category.restaurantId as string)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to update category')
    if (mainCategoryId) {
      const mainCategory = await this.CategoryRepository.findById(mainCategoryId)
      if (!mainCategory || mainCategory.restaurantId !== category.restaurantId) {
        throw new NotFoundError('MainCategory', mainCategoryId)
      }
      if (mainCategoryId === categoryId) {
        throw new BadRequestError('Main category cannot be the same as the category')
      }
    }
    const existingCategory = await this.CategoryRepository.findOne({
      restaurantId: category.restaurantId,
      name: categoryData.name
    })
    if (existingCategory && existingCategory.id !== categoryId) throw new ConflictError('Category already exists')
    category.update({
      ...categoryData,
      mainCategoryId,
      optionals: input.optionals || category.optionals
    })
    await this.CategoryRepository.update({ id: categoryId }, category)
  }
}
