import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateOrderType } from '@customers/application/orders/create-order/create-order.schema'
import { CreateOrderUsecase } from '@customers/application/orders/create-order/create-order.usecase'

export class CreateOrderController extends BaseController {
  @inject('CreateOrderValidate')
  private readonly CreateOrderValidate!: InputValidate<CreateOrderType>

  @inject('CreateOrderUsecase')
  private readonly CreateOrderUsecase!: CreateOrderUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/order',
      async (params: CreateOrderType) => {
        const validatedParams = this.CreateOrderValidate.validate(params)
        return await this.CreateOrderUsecase.execute(validatedParams)
      },
      HttpCode.CREATED,
      'isPublic'
    )
  }
}
