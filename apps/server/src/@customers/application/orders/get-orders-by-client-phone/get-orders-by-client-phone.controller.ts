import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetOrdersByClientPhoneType } from '@customers/application/orders/get-orders-by-client-phone/get-orders-by-client-phone.schema'
import { GetOrdersByClientPhoneUsecase } from '@customers/application/orders/get-orders-by-client-phone/get-orders-by-client-phone.usecase'

export class GetOrdersByClientPhoneController extends BaseController {
  @inject('GetOrdersByClientPhoneValidate')
  private readonly GetOrdersByClientPhoneValidate!: InputValidate<GetOrdersByClientPhoneType>

  @inject('GetOrdersByClientPhoneUsecase')
  private readonly GetOrdersByClientPhoneUsecase!: GetOrdersByClientPhoneUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/orders/phone/:phone/restaurant/:restaurantId',
      async (params: GetOrdersByClientPhoneType) => {
        const validatedParams = this.GetOrdersByClientPhoneValidate.validate(params)
        return await this.GetOrdersByClientPhoneUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
