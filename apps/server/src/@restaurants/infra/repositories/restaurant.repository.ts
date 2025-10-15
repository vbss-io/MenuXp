import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Restaurant } from '@restaurants/domain/restaurants/restaurant.entity'
import { type RestaurantDocument, RestaurantModel } from '@restaurants/domain/restaurants/restaurant.schema'

export interface RestaurantRepository<T = unknown> extends BaseRepository<T, Restaurant> {
  toDomain(entity: T): Restaurant
}

export class RestaurantRepositoryMongoose
  extends BaseRepositoryMongoose<RestaurantDocument, Restaurant>
  implements RestaurantRepository<RestaurantDocument>
{
  constructor(model = RestaurantModel) {
    super(model)
  }

  toDomain(entity: RestaurantDocument): Restaurant {
    return Restaurant.restore({
      id: entity._id.toString(),
      name: entity.name,
      description: entity.description,
      slug: entity.slug,
      ownerId: entity.ownerId,
      isActive: entity.isActive,
      logoPath: entity.logoPath,
      address: entity.address,
      contactInfo: entity.contactInfo,
      settings: entity.settings,
      style: entity.style,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
