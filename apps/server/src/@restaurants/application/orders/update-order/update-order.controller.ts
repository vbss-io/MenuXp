import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateOrderType } from '@restaurants/application/orders/update-order/update-order.schema'
import { UpdateOrderUsecase } from '@restaurants/application/orders/update-order/update-order.usecase'

export class UpdateOrderController extends BaseController {
  @inject('UpdateOrderValidate')
  private readonly UpdateOrderValidate!: InputValidate<UpdateOrderType>

  @inject('UpdateOrderUsecase')
  private readonly UpdateOrderUsecase!: UpdateOrderUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/order/:orderId',
      async (params: UpdateOrderType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateOrderValidate.validate(params)
        return await this.UpdateOrderUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
