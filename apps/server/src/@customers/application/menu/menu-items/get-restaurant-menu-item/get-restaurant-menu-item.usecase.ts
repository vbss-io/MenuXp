import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantMenuItemType } from '@customers/application/menu/menu-items/get-restaurant-menu-item/get-restaurant-menu-item.schema'
import type { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export type GetRestaurantMenuItemUsecaseOutput = Partial<MenuItem> & {
  categoryName: string
  medias: string[]
}

export class GetRestaurantMenuItemUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  async execute({ restaurantId, menuItemId }: GetRestaurantMenuItemType): Promise<GetRestaurantMenuItemUsecaseOutput> {
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    const menuItem = await this.MenuItemRepository.findOne({
      id: menuItemId,
      restaurantId,
      isActive: true
    })
    if (!menuItem) throw new NotFoundError('Menu Item', menuItemId)
    const category = await this.CategoryRepository.findById(menuItem.categoryId)
    if (!category) throw new NotFoundError('Category', menuItem.categoryId)
    return {
      ...menuItem,
      categoryName: category.name,
      medias: menuItem.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }
  }
}
