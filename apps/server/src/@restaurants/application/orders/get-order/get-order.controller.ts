import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetOrderType } from '@restaurants/application/orders/get-order/get-order.schema'
import { GetOrderUsecase } from '@restaurants/application/orders/get-order/get-order.usecase'

export class GetOrderController extends BaseController {
  @inject('GetOrderValidate')
  private readonly GetOrderValidate!: InputValidate<GetOrderType>

  @inject('GetOrderUsecase')
  private readonly GetOrderUsecase!: GetOrderUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/order/:orderId',
      async (params: GetOrderType) => {
        const { id } = this.RequestFacade.getUser()
        const { orderId } = this.GetOrderValidate.validate(params)
        return await this.GetOrderUsecase.execute({ orderId, userId: id })
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
