import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ActivateMenuLayoutType } from '@restaurants/application/menu-layouts/activate-menu-layout/activate-menu-layout.schema'
import { ActivateMenuLayoutUsecase } from '@restaurants/application/menu-layouts/activate-menu-layout/activate-menu-layout.usecase'

export class ActivateMenuLayoutController extends BaseController {
  @inject('ActivateMenuLayoutValidate')
  private readonly ActivateMenuLayoutValidate!: InputValidate<ActivateMenuLayoutType>

  @inject('ActivateMenuLayoutUsecase')
  private readonly ActivateMenuLayoutUsecase!: ActivateMenuLayoutUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/menu-layouts/:layoutId/activate',
      async (params: ActivateMenuLayoutType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.ActivateMenuLayoutValidate.validate(params)
        return await this.ActivateMenuLayoutUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
