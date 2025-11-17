import { inject } from '@api/infra/dependency-injection/registry'

import {
  GetMenuItemsQueryBuilderMongoose,
  type GetMenuItemsQueryInput
} from '@restaurants/application/menu-items/@queries/get-menu-items.builder'
import { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { MenuItemModel } from '@restaurants/domain/menu-items/menu-item.schema'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'

export interface GetMenuItemsQueryOutput {
  total: number
  menuItems: Array<Partial<MenuItem> & { categoryName: string }>
}

export interface GetMenuItemsQuery {
  execute: (input: GetMenuItemsQueryInput) => Promise<GetMenuItemsQueryOutput>
}

export class GetMenuItemsQueryMongoose implements GetMenuItemsQuery {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  async execute(input: GetMenuItemsQueryInput): Promise<GetMenuItemsQueryOutput> {
    const query = GetMenuItemsQueryBuilderMongoose.init(MenuItemModel)
      .restaurantId(input.restaurantId)
      .categoryId(input.categoryId)
      .search(input.searchMask)
      .includeInactive(input.includeInactive)
      .sort(input.sortField, input.sortOrder)
      .paginate(input.page, input.rowsPerPage)
    const { documents, totalCount } = await query.execute()
    const menuItems = documents.map((document) => {
      const menuItem = this.MenuItemRepository.toDomain(document)
      return {
        ...menuItem,
        categoryName: document.categoryName
      }
    })
    return { total: totalCount, menuItems }
  }
}
