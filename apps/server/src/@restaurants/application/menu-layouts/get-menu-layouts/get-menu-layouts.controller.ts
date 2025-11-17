import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetMenuLayoutsType } from '@restaurants/application/menu-layouts/get-menu-layouts/get-menu-layouts.schema'
import { GetMenuLayoutsUsecase } from '@restaurants/application/menu-layouts/get-menu-layouts/get-menu-layouts.usecase'

export class GetMenuLayoutsController extends BaseController {
  @inject('GetMenuLayoutsValidate')
  private readonly GetMenuLayoutsValidate!: InputValidate<GetMenuLayoutsType>

  @inject('GetMenuLayoutsUsecase')
  private readonly GetMenuLayoutsUsecase!: GetMenuLayoutsUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/menu-layouts/restaurant/:restaurantId',
      async (params: GetMenuLayoutsType) => {
        const { id } = this.RequestFacade.getUser()
        const { restaurantId } = this.GetMenuLayoutsValidate.validate(params)
        return await this.GetMenuLayoutsUsecase.execute({ restaurantId, userId: id })
      },
      HttpCode.OK
    )
  }
}
