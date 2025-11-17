import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantMenuItemsType } from '@customers/application/menu/menu-items/get-restaurant-menu-items/get-restaurant-menu-items.schema'
import { GetRestaurantMenuItemsUsecase } from '@customers/application/menu/menu-items/get-restaurant-menu-items/get-restaurant-menu-items.usecase'

export class GetRestaurantMenuItemsController extends BaseController {
  @inject('GetRestaurantMenuItemsValidate')
  private readonly GetRestaurantMenuItemsValidate!: InputValidate<GetRestaurantMenuItemsType>

  @inject('GetRestaurantMenuItemsUsecase')
  private readonly GetRestaurantMenuItemsUsecase!: GetRestaurantMenuItemsUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/menu/restaurant/:restaurantId/items',
      async (params: GetRestaurantMenuItemsType) => {
        const validatedInput = this.GetRestaurantMenuItemsValidate.validate(params)
        return await this.GetRestaurantMenuItemsUsecase.execute(validatedInput)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
