import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantItemsByCategoryType } from '@customers/application/menu/all-items/get-restaurant-items-by-category/get-restaurant-items-by-category.schema'
import { GetRestaurantItemsByCategoryUsecase } from '@customers/application/menu/all-items/get-restaurant-items-by-category/get-restaurant-items-by-category.usecase'

export class GetRestaurantItemsByCategoryController extends BaseController {
  @inject('GetRestaurantItemsByCategoryValidate')
  private readonly GetRestaurantItemsByCategoryValidate!: InputValidate<GetRestaurantItemsByCategoryType>

  @inject('GetRestaurantItemsByCategoryUsecase')
  private readonly GetRestaurantItemsByCategoryUsecase!: GetRestaurantItemsByCategoryUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/menu/restaurant/:restaurantId/category/:categoryId/all-items',
      async (params: GetRestaurantItemsByCategoryType) => {
        const validatedInput = this.GetRestaurantItemsByCategoryValidate.validate(params)
        return await this.GetRestaurantItemsByCategoryUsecase.execute(validatedInput)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
