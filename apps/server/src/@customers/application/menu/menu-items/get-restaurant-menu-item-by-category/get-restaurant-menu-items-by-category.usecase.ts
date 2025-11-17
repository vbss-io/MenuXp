import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantMenuItemsByCategoryType } from '@customers/application/menu/menu-items/get-restaurant-menu-item-by-category/get-restaurant-menu-items-by-category.schema'

import type { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export type GetRestaurantMenuItemsByCategoryUsecaseOutput = (Partial<MenuItem> & { medias: string[] })[]

export class GetRestaurantMenuItemsByCategoryUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute(input: GetRestaurantMenuItemsByCategoryType): Promise<GetRestaurantMenuItemsByCategoryUsecaseOutput> {
    const { restaurantId, categoryId } = input
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    const activeMenuItems = await this.MenuItemRepository.find({
      restaurantId,
      categoryId,
      isActive: true
    })
    return activeMenuItems.map((menuItem) => ({
      ...menuItem,
      medias: menuItem.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }))
  }
}
