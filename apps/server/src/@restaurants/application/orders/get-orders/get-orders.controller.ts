import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetOrdersType } from '@restaurants/application/orders/get-orders/get-orders.schema'
import { GetOrdersUsecase } from '@restaurants/application/orders/get-orders/get-orders.usecase'

export class GetOrdersController extends BaseController {
  @inject('GetOrdersValidate')
  private readonly GetOrdersValidate!: InputValidate<GetOrdersType>

  @inject('GetOrdersUsecase')
  private readonly GetOrdersUsecase!: GetOrdersUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/orders',
      async (params: GetOrdersType) => {
        const { id } = this.RequestFacade.getUser()
        const page = Number(params.page ?? 1)
        const rowsPerPage = Number(params.rowsPerPage ?? 25)
        const validatedParams = this.GetOrdersValidate.validate({ ...params, page, rowsPerPage })
        return await this.GetOrdersUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
