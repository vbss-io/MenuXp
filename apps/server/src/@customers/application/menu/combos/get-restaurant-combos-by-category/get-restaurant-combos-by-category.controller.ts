import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantCombosByCategoryType } from '@customers/application/menu/combos/get-restaurant-combos-by-category/get-restaurant-combos-by-category.schema'
import { GetRestaurantCombosByCategoryUsecase } from '@customers/application/menu/combos/get-restaurant-combos-by-category/get-restaurant-combos-by-category.usecase'

export class GetRestaurantCombosByCategoryController extends BaseController {
  @inject('GetRestaurantCombosByCategoryValidate')
  private readonly GetRestaurantCombosByCategoryValidate!: InputValidate<GetRestaurantCombosByCategoryType>

  @inject('GetRestaurantCombosByCategoryUsecase')
  private readonly GetRestaurantCombosByCategoryUsecase!: GetRestaurantCombosByCategoryUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/menu/restaurant/:restaurantId/category/:categoryId/combos',
      async (params: GetRestaurantCombosByCategoryType) => {
        const validatedInput = this.GetRestaurantCombosByCategoryValidate.validate(params)
        return await this.GetRestaurantCombosByCategoryUsecase.execute(validatedInput)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
