import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { DeleteOrderType } from '@restaurants/application/orders/delete-order/delete-order.schema'
import { DeleteOrderUsecase } from '@restaurants/application/orders/delete-order/delete-order.usecase'

export class DeleteOrderController extends BaseController {
  @inject('DeleteOrderValidate')
  private readonly DeleteOrderValidate!: InputValidate<DeleteOrderType>

  @inject('DeleteOrderUsecase')
  private readonly DeleteOrderUsecase!: DeleteOrderUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.DELETE,
      '/order/:orderId',
      async (params: DeleteOrderType) => {
        const { id } = this.RequestFacade.getUser()
        const { orderId } = this.DeleteOrderValidate.validate(params)
        return await this.DeleteOrderUsecase.execute({ orderId, userId: id })
      },
      HttpCode.NO_CONTENT
    )
  }
}
