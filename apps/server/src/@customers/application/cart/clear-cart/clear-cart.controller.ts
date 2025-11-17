import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { ClearCartType } from '@customers/application/cart/clear-cart/clear-cart.schema'
import { ClearCartUsecase } from '@customers/application/cart/clear-cart/clear-cart.usecase'

export class ClearCartController extends BaseController {
  @inject('ClearCartValidate')
  private ClearCartValidate!: InputValidate<ClearCartType>

  @inject('ClearCartUsecase')
  private ClearCartUsecase!: ClearCartUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.DELETE,
      '/cart/clear/restaurant/:restaurantId',
      async (params: ClearCartType) => {
        const validatedParams = this.ClearCartValidate.validate(params)
        return await this.ClearCartUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
