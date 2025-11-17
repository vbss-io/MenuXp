import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { CategoryOptional } from '@restaurants/domain/categories/category.entity'
import { MenuItemOptional } from '@restaurants/domain/menu-items/menu-item.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'

import { GetMenuItemOptionalsType } from './get-menu-item-optionals.schema'

export interface GetMenuItemOptionalsUsecaseOutput {
  itemOptionals: MenuItemOptional[]
  categoryOptionals: CategoryOptional[]
  allOptionals: (MenuItemOptional | CategoryOptional)[]
}

export class GetMenuItemOptionalsUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  async execute({ menuItemId }: GetMenuItemOptionalsType): Promise<GetMenuItemOptionalsUsecaseOutput> {
    const menuItem = await this.MenuItemRepository.findById(menuItemId)
    if (!menuItem) throw new NotFoundError('MenuItem', menuItemId)
    const category = await this.CategoryRepository.findById(menuItem.categoryId)
    if (!category) throw new NotFoundError('Category', menuItem.categoryId)
    const itemOptionals = menuItem.optionals
    const categoryOptionals = menuItem.useCategoryOptionals ? category.optionals : []
    const allOptionals = [...itemOptionals, ...categoryOptionals]
    return {
      itemOptionals,
      categoryOptionals,
      allOptionals
    }
  }
}
