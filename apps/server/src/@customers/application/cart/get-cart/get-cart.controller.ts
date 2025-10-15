import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { GetCartType } from '@customers/application/cart/get-cart/get-cart.schema'
import { GetCartUsecase } from '@customers/application/cart/get-cart/get-cart.usecase'

export class GetCartController extends BaseController {
  @inject('GetCartValidate')
  private GetCartValidate!: InputValidate<GetCartType>

  @inject('GetCartUsecase')
  private GetCartUsecase!: GetCartUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/cart/restaurant/:restaurantId',
      async (params: GetCartType) => {
        const validatedParams = this.GetCartValidate.validate(params)
        return await this.GetCartUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
