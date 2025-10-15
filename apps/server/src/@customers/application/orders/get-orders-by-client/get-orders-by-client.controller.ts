import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetOrdersByClientType } from '@customers/application/orders/get-orders-by-client/get-orders-by-client.schema'
import { GetOrdersByClientUsecase } from '@customers/application/orders/get-orders-by-client/get-orders-by-client.usecase'

export class GetOrdersByClientController extends BaseController {
  @inject('GetOrdersByClientValidate')
  private readonly GetOrdersByClientValidate!: InputValidate<GetOrdersByClientType>
  @inject('GetOrdersByClientUsecase')
  private readonly GetOrdersByClientUsecase!: GetOrdersByClientUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/orders/client/:clientId/restaurant/:restaurantId',
      async (params: GetOrdersByClientType) => {
        const validatedParams = this.GetOrdersByClientValidate.validate(params)
        return await this.GetOrdersByClientUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
