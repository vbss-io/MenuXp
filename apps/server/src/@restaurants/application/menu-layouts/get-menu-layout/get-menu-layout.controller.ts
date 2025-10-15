import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetMenuLayoutType } from '@restaurants/application/menu-layouts/get-menu-layout/get-menu-layout.schema'
import { GetMenuLayoutUsecase } from '@restaurants/application/menu-layouts/get-menu-layout/get-menu-layout.usecase'

export class GetMenuLayoutController extends BaseController {
  @inject('GetMenuLayoutValidate')
  private readonly GetMenuLayoutValidate!: InputValidate<GetMenuLayoutType>

  @inject('GetMenuLayoutUsecase')
  private readonly GetMenuLayoutUsecase!: GetMenuLayoutUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/menu-layouts/:layoutId',
      async (params: GetMenuLayoutType) => {
        const { id } = this.RequestFacade.getUser()
        const { layoutId } = this.GetMenuLayoutValidate.validate(params)
        return await this.GetMenuLayoutUsecase.execute({ layoutId, userId: id })
      },
      HttpCode.OK
    )
  }
}
