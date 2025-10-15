import { ConflictError } from '@api/domain/errors/conflict.error'
import { ForbiddenError } from '@api/domain/errors/forbidden.error'
import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import { DeleteCategoryType } from '@restaurants/application/categories/delete-category/delete-category.schema'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type DeleteCategoryUsecaseInput = DeleteCategoryType & {
  userId: string
}

export class DeleteCategoryUsecase {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute(input: DeleteCategoryUsecaseInput): Promise<void> {
    const { userId, categoryId } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const category = await this.CategoryRepository.findById(categoryId)
    if (!category) throw new NotFoundError('Category', categoryId)
    const restaurant = await this.RestaurantRepository.findById(category.restaurantId as string)
    if (!restaurant) throw new NotFoundError('Restaurant', category.restaurantId as string)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to delete category')
    const subCategories = await this.CategoryRepository.find({
      mainCategoryId: categoryId,
      isActive: true
    })
    if (subCategories.length > 0) throw new ConflictError('Category has sub categories')
    const menuItems = await this.MenuItemRepository.find({
      categoryId,
      isActive: true
    })
    if (menuItems.length > 0) throw new ConflictError('Category has menu items')
    await this.CategoryRepository.delete({ id: categoryId })
  }
}
