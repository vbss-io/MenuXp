import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { RevokeSectionType } from '@restaurants/application/admin/revoke-section/revoke-section.schema'
import { RevokeSectionUsecase } from '@restaurants/application/admin/revoke-section/revoke-section.usecase'

export class RevokeSectionController extends BaseController {
  @inject('RevokeSectionValidate')
  private readonly RevokeSectionValidate!: InputValidate<RevokeSectionType>

  @inject('RevokeSectionUsecase')
  private readonly RevokeSectionUsecase!: RevokeSectionUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/admin/section/:userId/revoke',
      async (params: RevokeSectionType) => {
        const parsedData = this.RevokeSectionValidate.validate(params)
        return await this.RevokeSectionUsecase.execute(parsedData)
      },
      HttpCode.NO_CONTENT,
      'isAdmin'
    )
  }
}
