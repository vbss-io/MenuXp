import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { DeleteMenuItemType } from '@restaurants/application/menu-items/delete-menu-item/delete-menu-item.schema'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type DeleteMenuItemUsecaseInput = DeleteMenuItemType & {
  userId: string
}

export class DeleteMenuItemUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  async execute({ userId, menuItemId }: DeleteMenuItemUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const menuItem = await this.MenuItemRepository.findById(menuItemId)
    if (!menuItem) throw new NotFoundError('MenuItem', menuItemId)
    const restaurant = await this.RestaurantRepository.findById(menuItem.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', menuItem.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to delete menu item')
    for (const media of menuItem.medias) {
      await this.FileStorage.delete(media)
    }
    await this.MenuItemRepository.delete({ id: menuItemId })
  }
}
