import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { CustomerUser } from '@customers/domain/users/customer-user.entity'
import { type CustomerUserDocument, CustomerUserModel } from '@customers/domain/users/customer-user.schema'

export interface CustomerUserRepository<T = unknown> extends BaseRepository<T, CustomerUser> {
  toDomain(entity: T): CustomerUser
}

export class CustomerUserRepositoryMongoose
  extends BaseRepositoryMongoose<CustomerUserDocument, CustomerUser>
  implements CustomerUserRepository<CustomerUserDocument>
{
  constructor(model = CustomerUserModel) {
    super(model)
  }

  toDomain(entity: CustomerUserDocument): CustomerUser {
    return CustomerUser.restore({
      id: entity._id.toString(),
      phone: entity.phone,
      restaurantId: entity.restaurantId,
      name: entity.name,
      address: entity.address,
      preferredLanguage: entity.preferredLanguage,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
