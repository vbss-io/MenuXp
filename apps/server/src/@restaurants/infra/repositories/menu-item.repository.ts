import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'

import { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { type MenuItemDocument, MenuItemModel } from '@restaurants/domain/menu-items/menu-item.schema'

export interface MenuItemRepository<T = unknown> extends BaseRepository<T, MenuItem> {
  toDomain(entity: T): MenuItem
}

export class MenuItemRepositoryMongoose
  extends BaseRepositoryMongoose<MenuItemDocument, MenuItem>
  implements MenuItemRepository<MenuItemDocument>
{
  constructor(model = MenuItemModel) {
    super(model)
  }

  toDomain(entity: MenuItemDocument): MenuItem {
    return MenuItem.restore({
      id: entity._id.toString(),
      name: entity.name,
      isActive: entity.isActive,
      restaurantId: entity.restaurantId,
      categoryId: entity.categoryId,
      price: entity.price,
      stock: entity.stock,
      discount: entity.discount,
      medias: entity.medias,
      optionals: entity.optionals,
      useCategoryOptionals: entity.useCategoryOptionals,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
