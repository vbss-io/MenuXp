import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateMenuLayoutType } from '@restaurants/application/menu-layouts/create-menu-layout/create-menu-layout.schema'
import { CreateMenuLayoutUsecase } from '@restaurants/application/menu-layouts/create-menu-layout/create-menu-layout.usecase'

export class CreateMenuLayoutController extends BaseController {
  @inject('CreateMenuLayoutValidate')
  private readonly CreateMenuLayoutValidate!: InputValidate<CreateMenuLayoutType>

  @inject('CreateMenuLayoutUsecase')
  private readonly CreateMenuLayoutUsecase!: CreateMenuLayoutUsecase
  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/menu-layouts',
      async (params: CreateMenuLayoutType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateMenuLayoutValidate.validate(params)
        return await this.CreateMenuLayoutUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
  }
}
