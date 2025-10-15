import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetMenuItemOptionalsType } from '@restaurants/application/menu-items/get-menu-item-optionals/get-menu-item-optionals.schema'
import { GetMenuItemOptionalsUsecase } from '@restaurants/application/menu-items/get-menu-item-optionals/get-menu-item-optionals.usecase'

export class GetMenuItemOptionalsController extends BaseController {
  @inject('GetMenuItemOptionalsValidate')
  private readonly GetMenuItemOptionalsValidate!: InputValidate<GetMenuItemOptionalsType>

  @inject('GetMenuItemOptionalsUsecase')
  private readonly GetMenuItemOptionalsUsecase!: GetMenuItemOptionalsUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/menu-item/:menuItemId/optionals',
      async (params: GetMenuItemOptionalsType) => {
        const validatedParams = this.GetMenuItemOptionalsValidate.validate(params)
        return await this.GetMenuItemOptionalsUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
