import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetOrderBySlugAndCodeType } from '@customers/application/orders/get-order-by-slug-and-code/get-order-by-slug-and-code.schema'
import { GetOrderBySlugAndCodeUsecase } from '@customers/application/orders/get-order-by-slug-and-code/get-order-by-slug-and-code.usecase'

export class GetOrderBySlugAndCodeController extends BaseController {
  @inject('GetOrderBySlugAndCodeValidate')
  private readonly GetOrderBySlugAndCodeValidate!: InputValidate<GetOrderBySlugAndCodeType>

  @inject('GetOrderBySlugAndCodeUsecase')
  private readonly GetOrderBySlugAndCodeUsecase!: GetOrderBySlugAndCodeUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/order/slug/:restaurantSlug/code/:orderCode',
      async (params: GetOrderBySlugAndCodeType) => {
        const { restaurantSlug, orderCode } = this.GetOrderBySlugAndCodeValidate.validate(params)
        return await this.GetOrderBySlugAndCodeUsecase.execute({ restaurantSlug, orderCode })
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
