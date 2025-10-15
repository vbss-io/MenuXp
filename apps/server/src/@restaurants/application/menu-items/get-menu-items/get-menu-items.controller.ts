import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetMenuItemsType } from '@restaurants/application/menu-items/get-menu-items/get-menu-items.schema'
import { GetMenuItemsUsecase } from '@restaurants/application/menu-items/get-menu-items/get-menu-items.usecase'

export class GetMenuItemsController extends BaseController {
  @inject('GetMenuItemsValidate')
  private readonly GetMenuItemsValidate!: InputValidate<GetMenuItemsType>
  @inject('GetMenuItemsUsecase')
  private readonly GetMenuItemsUsecase!: GetMenuItemsUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/menu-items',
      async (params: GetMenuItemsType) => {
        const { id } = this.RequestFacade.getUser()
        const page = Number(params.page ?? 1)
        const rowsPerPage = Number(params.rowsPerPage ?? 20)
        const validatedParams = this.GetMenuItemsValidate.validate({ ...params, page, rowsPerPage })
        return await this.GetMenuItemsUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
