import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'

import { MenuLayoutEntity } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { type MenuLayoutDocument, MenuLayoutModel } from '@restaurants/domain/menu-layouts/menu-layout.schema'

export interface MenuLayoutRepository<T = unknown> extends BaseRepository<T, MenuLayoutEntity> {
  toDomain(menuLayout: T): MenuLayoutEntity
}

export class MenuLayoutRepositoryMongoose
  extends BaseRepositoryMongoose<MenuLayoutDocument, MenuLayoutEntity>
  implements MenuLayoutRepository<MenuLayoutDocument>
{
  constructor(model = MenuLayoutModel) {
    super(model)
  }

  toDomain(entity: MenuLayoutDocument): MenuLayoutEntity {
    return MenuLayoutEntity.restore({
      id: entity._id.toString(),
      name: entity.name,
      description: entity.description,
      restaurantId: entity.restaurantId,
      status: entity.status,
      layout: entity.layout,
      sections: entity.sections.map((section) => ({
        id: section.id,
        type: section.type,
        config: section.config
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
