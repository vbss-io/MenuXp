import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { User } from '@restaurants/domain/users/user.entity'
import { type UserDocument, UserModel } from '@restaurants/domain/users/user.schema'

export interface UserRepository<T = unknown> extends BaseRepository<T, User> {
  toDomain(user: T): User
}

export class UserRepositoryMongoose
  extends BaseRepositoryMongoose<UserDocument, User>
  implements UserRepository<UserDocument>
{
  constructor(model = UserModel) {
    super(model)
  }

  toDomain(entity: UserDocument): User {
    return User.restore({
      id: entity._id.toString(),
      name: entity.name,
      email: entity.email,
      passwordHash: entity.passwordHash,
      confirmedEmail: entity.confirmedEmail,
      role: entity.role,
      userType: entity.userType,
      status: entity.status,
      restaurantId: entity.restaurantId,
      avatarPath: entity.avatarPath,
      currentSubscriptionId: entity.currentSubscriptionId,
      externalCustomerId: entity.externalCustomerId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
