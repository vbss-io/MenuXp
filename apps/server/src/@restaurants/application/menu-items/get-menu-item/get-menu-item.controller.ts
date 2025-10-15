import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetMenuItemType } from '@restaurants/application/menu-items/get-menu-item/get-menu-item.schema'
import { GetMenuItemUsecase } from '@restaurants/application/menu-items/get-menu-item/get-menu-item.usecase'

export class GetMenuItemController extends BaseController {
  @inject('GetMenuItemValidate')
  private readonly GetMenuItemValidate!: InputValidate<GetMenuItemType>
  @inject('GetMenuItemUsecase')
  private readonly GetMenuItemUsecase!: GetMenuItemUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/menu-item/:menuItemId',
      async (params: GetMenuItemType) => {
        const validatedParams = this.GetMenuItemValidate.validate(params)
        return await this.GetMenuItemUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
