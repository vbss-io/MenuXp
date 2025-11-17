import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantCombosType } from '@customers/application/menu/combos/get-restaurant-combos/get-restaurant-combos.schema'
import { GetRestaurantCombosUsecase } from '@customers/application/menu/combos/get-restaurant-combos/get-restaurant-combos.usecase'

export class GetRestaurantCombosController extends BaseController {
  @inject('GetRestaurantCombosValidate')
  private readonly GetRestaurantCombosValidate!: InputValidate<GetRestaurantCombosType>

  @inject('GetRestaurantCombosUsecase')
  private readonly GetRestaurantCombosUsecase!: GetRestaurantCombosUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/menu/restaurant/:restaurantId/combos',
      async (params: GetRestaurantCombosType) => {
        const validatedInput = this.GetRestaurantCombosValidate.validate(params)
        return await this.GetRestaurantCombosUsecase.execute(validatedInput)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
