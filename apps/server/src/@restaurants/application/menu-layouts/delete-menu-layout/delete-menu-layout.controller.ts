import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { DeleteMenuLayoutType } from '@restaurants/application/menu-layouts/delete-menu-layout/delete-menu-layout.schema'
import { DeleteMenuLayoutUsecase } from '@restaurants/application/menu-layouts/delete-menu-layout/delete-menu-layout.usecase'

export class DeleteMenuLayoutController extends BaseController {
  @inject('DeleteMenuLayoutValidate')
  private readonly DeleteMenuLayoutValidate!: InputValidate<DeleteMenuLayoutType>

  @inject('DeleteMenuLayoutUsecase')
  private readonly DeleteMenuLayoutUsecase!: DeleteMenuLayoutUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.DELETE,
      '/menu-layouts/:layoutId',
      async (params: DeleteMenuLayoutType) => {
        const { id } = this.RequestFacade.getUser()
        const { layoutId } = this.DeleteMenuLayoutValidate.validate(params)
        return await this.DeleteMenuLayoutUsecase.execute({ layoutId, userId: id })
      },
      HttpCode.NO_CONTENT
    )
  }
}
