import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantInfoType } from '@customers/application/restaurant/get-restaurant-info/get-restaurant-info.schema'
import { GetRestaurantInfoUsecase } from '@customers/application/restaurant/get-restaurant-info/get-restaurant-info.usecase'

export class GetRestaurantInfoController extends BaseController {
  @inject('GetRestaurantInfoValidate')
  private readonly GetRestaurantInfoValidate!: InputValidate<GetRestaurantInfoType>

  @inject('GetRestaurantInfoUsecase')
  private readonly GetRestaurantInfoUsecase!: GetRestaurantInfoUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/menu/restaurant/:slug',
      async (params: GetRestaurantInfoType) => {
        const validatedParams = this.GetRestaurantInfoValidate.validate(params)
        return await this.GetRestaurantInfoUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
