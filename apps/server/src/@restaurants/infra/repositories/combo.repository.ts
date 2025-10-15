import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Combo } from '@restaurants/domain/combos/combo.entity'
import { type ComboDocument, ComboModel } from '@restaurants/domain/combos/combo.schema'

export interface ComboRepository<T = unknown> extends BaseRepository<T, Combo> {
  toDomain(combo: T): Combo
}

export class ComboRepositoryMongoose
  extends BaseRepositoryMongoose<ComboDocument, Combo>
  implements ComboRepository<ComboDocument>
{
  constructor(model = ComboModel) {
    super(model)
  }

  toDomain(entity: ComboDocument): Combo {
    return Combo.restore({
      id: entity._id.toString(),
      name: entity.name,
      isActive: entity.isActive,
      description: entity.description,
      restaurantId: entity.restaurantId,
      categoryId: entity.categoryId,
      price: entity.price,
      stock: entity.stock,
      discount: entity.discount,
      medias: entity.medias,
      items: entity.items,
      optionals: entity.optionals,
      useCategoryOptionals: entity.useCategoryOptionals,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
