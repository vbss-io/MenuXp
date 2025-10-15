import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantMenuItemType } from '@customers/application/menu/menu-items/get-restaurant-menu-item/get-restaurant-menu-item.schema'
import { GetRestaurantMenuItemUsecase } from '@customers/application/menu/menu-items/get-restaurant-menu-item/get-restaurant-menu-item.usecase'

export class GetRestaurantMenuItemController extends BaseController {
  @inject('GetRestaurantMenuItemValidate')
  private readonly GetRestaurantMenuItemValidate!: InputValidate<GetRestaurantMenuItemType>

  @inject('GetRestaurantMenuItemUsecase')
  private readonly GetRestaurantMenuItemUsecase!: GetRestaurantMenuItemUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/menu/restaurant/:restaurantId/item/:menuItemId',
      async (params: GetRestaurantMenuItemType) => {
        const validatedInput = this.GetRestaurantMenuItemValidate.validate(params)
        return await this.GetRestaurantMenuItemUsecase.execute(validatedInput)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
