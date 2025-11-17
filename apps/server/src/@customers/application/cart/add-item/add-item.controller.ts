import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { AddItemToCartType } from '@customers/application/cart/add-item/add-item.schema'
import { AddItemToCartUsecase } from '@customers/application/cart/add-item/add-item.usecase'

export class AddItemToCartController extends BaseController {
  @inject('AddItemToCartValidate')
  private AddItemToCartValidate!: InputValidate<AddItemToCartType>

  @inject('AddItemToCartUsecase')
  private AddItemToCartUsecase!: AddItemToCartUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/cart/add-item',
      async (params: AddItemToCartType) => {
        const validatedParams = this.AddItemToCartValidate.validate(params)
        return await this.AddItemToCartUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
