import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { ToggleCategoryStatusType } from '@restaurants/application/categories/toggle-category-status/toggle-category-status.schema'
import { ToggleCategoryStatusUsecase } from '@restaurants/application/categories/toggle-category-status/toggle-category-status.usecase'

export class ToggleCategoryStatusController extends BaseController {
  @inject('ToggleCategoryStatusValidate')
  private readonly ToggleCategoryStatusValidate!: InputValidate<ToggleCategoryStatusType>

  @inject('ToggleCategoryStatusUsecase')
  private readonly ToggleCategoryStatusUsecase!: ToggleCategoryStatusUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/category/:categoryId/toggle-status',
      async (params: ToggleCategoryStatusType) => {
        const { id } = this.RequestFacade.getUser()
        const { categoryId } = this.ToggleCategoryStatusValidate.validate(params)
        return await this.ToggleCategoryStatusUsecase.execute({ categoryId, userId: id })
      },
      HttpCode.NO_CONTENT
    )
  }
}
