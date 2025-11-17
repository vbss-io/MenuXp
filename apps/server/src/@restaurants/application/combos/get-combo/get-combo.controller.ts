import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetComboType } from '@restaurants/application/combos/get-combo/get-combo.schema'
import { GetComboUsecase } from '@restaurants/application/combos/get-combo/get-combo.usecase'

export class GetComboController extends BaseController {
  @inject('GetComboValidate')
  private readonly GetComboValidate!: InputValidate<GetComboType>

  @inject('GetComboUsecase')
  private readonly GetComboUsecase!: GetComboUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/combo/:comboId',
      async (params: GetComboType) => {
        const validatedParams = this.GetComboValidate.validate(params)
        return await this.GetComboUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
