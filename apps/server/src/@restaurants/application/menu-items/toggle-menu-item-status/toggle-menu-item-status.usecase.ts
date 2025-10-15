import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { ToggleMenuItemStatusType } from '@restaurants/application/menu-items/toggle-menu-item-status/toggle-menu-item-status.schema'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ToggleMenuItemStatusUsecaseInput = ToggleMenuItemStatusType & {
  userId: string
}

export class ToggleMenuItemStatusUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId, menuItemId }: ToggleMenuItemStatusUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const menuItem = await this.MenuItemRepository.findById(menuItemId)
    if (!menuItem) throw new NotFoundError('MenuItem', menuItemId)
    const restaurant = await this.RestaurantRepository.findById(menuItem.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', menuItem.restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to toggle menu item status')
    if (menuItem.isActive) {
      menuItem.deactivate()
    } else {
      menuItem.activate()
    }
    await this.MenuItemRepository.update({ id: menuItemId }, menuItem)
  }
}
