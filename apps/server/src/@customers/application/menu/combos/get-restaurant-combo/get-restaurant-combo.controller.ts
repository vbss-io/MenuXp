import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantComboType } from '@customers/application/menu/combos/get-restaurant-combo/get-restaurant-combo.schema'
import { GetRestaurantComboUsecase } from '@customers/application/menu/combos/get-restaurant-combo/get-restaurant-combo.usecase'

export class GetRestaurantComboController extends BaseController {
  @inject('GetRestaurantComboValidate')
  private readonly GetRestaurantComboValidate!: InputValidate<GetRestaurantComboType>

  @inject('GetRestaurantComboUsecase')
  private readonly GetRestaurantComboUsecase!: GetRestaurantComboUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/menu/restaurant/:restaurantId/combo/:comboId',
      async (params: GetRestaurantComboType) => {
        const validatedInput = this.GetRestaurantComboValidate.validate(params)
        return await this.GetRestaurantComboUsecase.execute(validatedInput)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
