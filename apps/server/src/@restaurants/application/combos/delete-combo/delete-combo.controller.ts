import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { DeleteComboType } from '@restaurants/application/combos/delete-combo/delete-combo.schema'
import { DeleteComboUsecase } from '@restaurants/application/combos/delete-combo/delete-combo.usecase'

export class DeleteComboController extends BaseController {
  @inject('DeleteComboValidate')
  private readonly DeleteComboValidate!: InputValidate<DeleteComboType>

  @inject('DeleteComboUsecase')
  private readonly DeleteComboUsecase!: DeleteComboUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.DELETE,
      '/combo/:comboId',
      async (params: DeleteComboType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.DeleteComboValidate.validate(params)
        return await this.DeleteComboUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
