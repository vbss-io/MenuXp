import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { GetRestaurantInfoController } from '@customers/application/restaurant/get-restaurant-info/get-restaurant-info.controller'
import { GetRestaurantInfoSchema } from '@customers/application/restaurant/get-restaurant-info/get-restaurant-info.schema'
import { GetRestaurantInfoUsecase } from '@customers/application/restaurant/get-restaurant-info/get-restaurant-info.usecase'

export class RestaurantModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetRestaurantInfoValidate', new ZodAdapter(GetRestaurantInfoSchema))
    registry.provide('GetRestaurantInfoUsecase', new GetRestaurantInfoUsecase())
    new GetRestaurantInfoController()
  }
}
