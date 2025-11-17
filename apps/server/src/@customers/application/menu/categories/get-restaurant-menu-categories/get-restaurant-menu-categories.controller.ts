import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantMenuCategoriesType } from '@customers/application/menu/categories/get-restaurant-menu-categories/get-restaurant-menu-categories.schema'
import { GetRestaurantMenuCategoriesUsecase } from '@customers/application/menu/categories/get-restaurant-menu-categories/get-restaurant-menu-categories.usecase'

export class GetRestaurantMenuCategoriesController extends BaseController {
  @inject('GetRestaurantMenuCategoriesValidate')
  private readonly GetRestaurantMenuCategoriesValidate!: InputValidate<GetRestaurantMenuCategoriesType>

  @inject('GetRestaurantMenuCategoriesUsecase')
  private readonly GetRestaurantMenuCategoriesUsecase!: GetRestaurantMenuCategoriesUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/menu/restaurant/:restaurantId/categories',
      async (params: GetRestaurantMenuCategoriesType) => {
        const validatedParams = this.GetRestaurantMenuCategoriesValidate.validate(params)
        return await this.GetRestaurantMenuCategoriesUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
