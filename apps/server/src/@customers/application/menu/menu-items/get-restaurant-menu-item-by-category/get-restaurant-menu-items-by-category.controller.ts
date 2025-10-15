import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantMenuItemsByCategoryType } from '@customers/application/menu/menu-items/get-restaurant-menu-item-by-category/get-restaurant-menu-items-by-category.schema'
import { GetRestaurantMenuItemsByCategoryUsecase } from '@customers/application/menu/menu-items/get-restaurant-menu-item-by-category/get-restaurant-menu-items-by-category.usecase'

export class GetRestaurantMenuItemsByCategoryController extends BaseController {
  @inject('GetRestaurantMenuItemsByCategoryValidate')
  private readonly GetRestaurantMenuItemsByCategoryValidate!: InputValidate<GetRestaurantMenuItemsByCategoryType>

  @inject('GetRestaurantMenuItemsByCategoryUsecase')
  private readonly GetRestaurantMenuItemsByCategoryUsecase!: GetRestaurantMenuItemsByCategoryUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/menu/restaurant/:restaurantId/category/:categoryId/items',
      async (params: GetRestaurantMenuItemsByCategoryType) => {
        const validatedInput = this.GetRestaurantMenuItemsByCategoryValidate.validate(params)
        return await this.GetRestaurantMenuItemsByCategoryUsecase.execute(validatedInput)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
