import { FormDataZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { UpdateUserProfileController } from '@restaurants/application/users/update-user-profile/update-user-profile.controller'
import {
  type UpdateUserProfileInputType,
  type UpdateUserProfileType,
  UpdateUserProfileSchema
} from '@restaurants/application/users/update-user-profile/update-user-profile.schema'
import { UpdateUserProfileUsecase } from '@restaurants/application/users/update-user-profile/update-user-profile.usecase'

export class UsersModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide(
      'UpdateUserProfileValidate',
      new FormDataZodAdapter<UpdateUserProfileInputType, UpdateUserProfileType>(UpdateUserProfileSchema)
    )
    registry.provide('UpdateUserProfileUsecase', new UpdateUserProfileUsecase())
    new UpdateUserProfileController()
  }
}
