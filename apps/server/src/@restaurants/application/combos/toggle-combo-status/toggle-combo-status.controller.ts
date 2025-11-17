import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { ToggleComboStatusType } from '@restaurants/application/combos/toggle-combo-status/toggle-combo-status.schema'
import { ToggleComboStatusUsecase } from '@restaurants/application/combos/toggle-combo-status/toggle-combo-status.usecase'

export class ToggleComboStatusController extends BaseController {
  @inject('ToggleComboStatusValidate')
  private readonly ToggleComboStatusValidate!: InputValidate<ToggleComboStatusType>

  @inject('ToggleComboStatusUsecase')
  private readonly ToggleComboStatusUsecase!: ToggleComboStatusUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/combo/:comboId/toggle-status',
      async (params: ToggleComboStatusType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.ToggleComboStatusValidate.validate(params)
        return await this.ToggleComboStatusUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
