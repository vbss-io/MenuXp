import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import {
  UpdateComboInputType,
  UpdateComboType
} from '@restaurants/application/combos/update-combo/update-combo.schema'
import { UpdateComboUsecase } from '@restaurants/application/combos/update-combo/update-combo.usecase'

export class UpdateComboController extends BaseController {
  @inject('UpdateComboValidate')
  private readonly UpdateComboValidate!: FormDataInputValidate<UpdateComboInputType, UpdateComboType>

  @inject('UpdateComboUsecase')
  private readonly UpdateComboUsecase!: UpdateComboUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/combo/:comboId',
      async (params: UpdateComboInputType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateComboValidate.validate(params)
        return await this.UpdateComboUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
