import { FormDataZodAdapter, ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { CheckSlugAvailableController } from '@restaurants/application/restaurants/check-slug-available/check-slug-available.controller'
import { CheckSlugSchema } from '@restaurants/application/restaurants/check-slug-available/check-slug-available.schema'
import { CheckSlugAvailableUsecase } from '@restaurants/application/restaurants/check-slug-available/check-slug-available.usecase'
import { CreateRestaurantController } from '@restaurants/application/restaurants/create-restaurant/create-restaurant.controller'
import {
  type CreateRestaurantInputType,
  type CreateRestaurantType,
  CreateRestaurantSchema
} from '@restaurants/application/restaurants/create-restaurant/create-restaurant.schema'
import { CreateRestaurantUsecase } from '@restaurants/application/restaurants/create-restaurant/create-restaurant.usecase'
import { GetRestaurantByIdController } from '@restaurants/application/restaurants/get-restaurant-by-id/get-restaurant-by-id.controller'
import { GetRestaurantByIdSchema } from '@restaurants/application/restaurants/get-restaurant-by-id/get-restaurant-by-id.schema'
import { GetRestaurantByIdUsecase } from '@restaurants/application/restaurants/get-restaurant-by-id/get-restaurant-by-id.usecase'
import { GetRestaurantBySlugController } from '@restaurants/application/restaurants/get-restaurant-by-slug/get-restaurant-by-slug.controller'
import { GetRestaurantBySlugSchema } from '@restaurants/application/restaurants/get-restaurant-by-slug/get-restaurant-by-slug.schema'
import { GetRestaurantBySlugUsecase } from '@restaurants/application/restaurants/get-restaurant-by-slug/get-restaurant-by-slug.usecase'
import { UpdateRestaurantAddressController } from '@restaurants/application/restaurants/update-restaurant-address/update-restaurant-address.controller'
import { UpdateRestaurantAddressSchema } from '@restaurants/application/restaurants/update-restaurant-address/update-restaurant-address.schema'
import { UpdateRestaurantAddressUsecase } from '@restaurants/application/restaurants/update-restaurant-address/update-restaurant-address.usecase'
import { UpdateRestaurantBasicInfoController } from '@restaurants/application/restaurants/update-restaurant-basic-info/update-restaurant-basic-info.controller'
import {
  type UpdateRestaurantBasicInfoInputType,
  type UpdateRestaurantBasicInfoType,
  UpdateRestaurantBasicInfoSchema
} from '@restaurants/application/restaurants/update-restaurant-basic-info/update-restaurant-basic-info.schema'
import { UpdateRestaurantBasicInfoUsecase } from '@restaurants/application/restaurants/update-restaurant-basic-info/update-restaurant-basic-info.usecase'
import { UpdateRestaurantContactInfoController } from '@restaurants/application/restaurants/update-restaurant-contact-info/update-restaurant-contact-info.controller'
import { UpdateRestaurantContactInfoSchema } from '@restaurants/application/restaurants/update-restaurant-contact-info/update-restaurant-contact-info.schema'
import { UpdateRestaurantContactInfoUsecase } from '@restaurants/application/restaurants/update-restaurant-contact-info/update-restaurant-contact-info.usecase'
import { UpdateRestaurantSettingsController } from '@restaurants/application/restaurants/update-restaurant-settings/update-restaurant-settings.controller'
import { UpdateRestaurantSettingsSchema } from '@restaurants/application/restaurants/update-restaurant-settings/update-restaurant-settings.schema'
import { UpdateRestaurantSettingsUsecase } from '@restaurants/application/restaurants/update-restaurant-settings/update-restaurant-settings.usecase'

export class RestaurantsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('CheckSlugAvailableValidate', new ZodAdapter(CheckSlugSchema))
    registry.provide('CheckSlugAvailableUsecase', new CheckSlugAvailableUsecase())
    new CheckSlugAvailableController()

    registry.provide(
      'CreateRestaurantValidate',
      new FormDataZodAdapter<CreateRestaurantInputType, CreateRestaurantType>(CreateRestaurantSchema)
    )
    registry.provide('CreateRestaurantUsecase', new CreateRestaurantUsecase())
    new CreateRestaurantController()

    registry.provide('GetRestaurantByIdValidate', new ZodAdapter(GetRestaurantByIdSchema))
    registry.provide('GetRestaurantByIdUsecase', new GetRestaurantByIdUsecase())
    new GetRestaurantByIdController()

    registry.provide('GetRestaurantBySlugValidate', new ZodAdapter(GetRestaurantBySlugSchema))
    registry.provide('GetRestaurantBySlugUsecase', new GetRestaurantBySlugUsecase())
    new GetRestaurantBySlugController()

    registry.provide('UpdateRestaurantAddressValidate', new ZodAdapter(UpdateRestaurantAddressSchema))
    registry.provide('UpdateRestaurantAddressUsecase', new UpdateRestaurantAddressUsecase())
    new UpdateRestaurantAddressController()

    registry.provide(
      'UpdateRestaurantBasicInfoValidate',
      new FormDataZodAdapter<UpdateRestaurantBasicInfoInputType, UpdateRestaurantBasicInfoType>(
        UpdateRestaurantBasicInfoSchema
      )
    )
    registry.provide('UpdateRestaurantBasicInfoUsecase', new UpdateRestaurantBasicInfoUsecase())
    new UpdateRestaurantBasicInfoController()

    registry.provide('UpdateRestaurantContactInfoValidate', new ZodAdapter(UpdateRestaurantContactInfoSchema))
    registry.provide('UpdateRestaurantContactInfoUsecase', new UpdateRestaurantContactInfoUsecase())
    new UpdateRestaurantContactInfoController()

    registry.provide('UpdateRestaurantSettingsValidate', new ZodAdapter(UpdateRestaurantSettingsSchema))
    registry.provide('UpdateRestaurantSettingsUsecase', new UpdateRestaurantSettingsUsecase())
    new UpdateRestaurantSettingsController()
  }
}
