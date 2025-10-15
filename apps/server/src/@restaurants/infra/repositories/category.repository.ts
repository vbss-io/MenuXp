import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Category } from '@restaurants/domain/categories/category.entity'
import { type CategoryDocument, CategoryModel } from '@restaurants/domain/categories/category.schema'

export interface CategoryRepository<T = unknown> extends BaseRepository<T, Category> {
  toDomain(category: T): Category
}

export class CategoryRepositoryMongoose
  extends BaseRepositoryMongoose<CategoryDocument, Category>
  implements CategoryRepository<CategoryDocument>
{
  constructor(model = CategoryModel) {
    super(model)
  }

  toDomain(entity: CategoryDocument): Category {
    return Category.restore({
      id: entity._id.toString(),
      name: entity.name,
      isActive: entity.isActive,
      description: entity.description,
      restaurantId: entity.restaurantId,
      mainCategoryId: entity.mainCategoryId,
      icon: entity.icon,
      optionals: entity.optionals,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
