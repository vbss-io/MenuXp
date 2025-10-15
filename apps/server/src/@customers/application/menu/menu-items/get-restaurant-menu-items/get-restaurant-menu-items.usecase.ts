import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantMenuItemsType } from '@customers/application/menu/menu-items/get-restaurant-menu-items/get-restaurant-menu-items.schema'
import type { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export type GetRestaurantMenuItemsUsecaseOutput = (Partial<MenuItem> & { medias: string[] })[]

export class GetRestaurantMenuItemsUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute({
    restaurantId,
    type,
    menuItemIds
  }: GetRestaurantMenuItemsType): Promise<GetRestaurantMenuItemsUsecaseOutput> {
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    let activeMenuItems = await this.MenuItemRepository.find({
      restaurantId,
      isActive: true
    })
    if (type) {
      switch (type) {
        case 'best_sellers':
          // To-Do: Implement logic to get the 5 best sellers menu items
          activeMenuItems = activeMenuItems.slice(0, 5)
          break
        case 'discounts':
          activeMenuItems = activeMenuItems.filter((menuItem) => menuItem.discount > 0)
          break
        case 'custom':
          if (menuItemIds && menuItemIds.length > 0) {
            activeMenuItems = activeMenuItems.filter((menuItem) => menuItemIds?.includes(menuItem.id as string))
          }
          break
        default:
          break
      }
    }
    return activeMenuItems.map((menuItem) => ({
      ...menuItem,
      medias: menuItem.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }))
  }
}
