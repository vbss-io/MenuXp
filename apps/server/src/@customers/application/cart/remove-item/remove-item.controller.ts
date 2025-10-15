import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { RemoveItemFromCartType } from '@customers/application/cart/remove-item/remove-item.schema'
import { RemoveItemFromCartUsecase } from '@customers/application/cart/remove-item/remove-item.usecase'

export class RemoveItemFromCartController extends BaseController {
  @inject('RemoveItemFromCartValidate')
  private RemoveItemFromCartValidate!: InputValidate<RemoveItemFromCartType>

  @inject('RemoveItemFromCartUsecase')
  private RemoveItemFromCartUsecase!: RemoveItemFromCartUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.DELETE,
      '/cart/remove-item',
      async (params: RemoveItemFromCartType) => {
        const validatedParams = this.RemoveItemFromCartValidate.validate(params)
        return await this.RemoveItemFromCartUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
