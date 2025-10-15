import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { UpdateCartItemQuantityType } from '@customers/application/cart/update-quantity/update-quantity.schema'
import { UpdateCartItemQuantityUsecase } from '@customers/application/cart/update-quantity/update-quantity.usecase'

export class UpdateCartItemQuantityController extends BaseController {
  @inject('UpdateCartItemQuantityValidate')
  private UpdateCartItemQuantityValidate!: InputValidate<UpdateCartItemQuantityType>

  @inject('UpdateCartItemQuantityUsecase')
  private UpdateCartItemQuantityUsecase!: UpdateCartItemQuantityUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PUT,
      '/cart/update-quantity',
      async (params: UpdateCartItemQuantityType) => {
        const validatedParams = this.UpdateCartItemQuantityValidate.validate(params)
        return await this.UpdateCartItemQuantityUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
