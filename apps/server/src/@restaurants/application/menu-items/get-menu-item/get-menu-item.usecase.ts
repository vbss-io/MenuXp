import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetMenuItemType } from '@restaurants/application/menu-items/get-menu-item/get-menu-item.schema'
import { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'

export class GetMenuItemUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  async execute({ menuItemId }: GetMenuItemType): Promise<MenuItem> {
    const menuItem = await this.MenuItemRepository.findById(menuItemId)
    if (!menuItem) throw new NotFoundError('MenuItem', menuItemId)
    return menuItem
  }
}
