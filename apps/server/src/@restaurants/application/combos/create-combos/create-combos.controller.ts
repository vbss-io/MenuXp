import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import {
  CreateComboInputType,
  CreateComboType
} from '@restaurants/application/combos/create-combos/create-combo.schema'
import { CreateComboUsecase } from '@restaurants/application/combos/create-combos/create-combo.usecase'

export class CreateComboController extends BaseController {
  @inject('CreateComboValidate')
  private readonly CreateComboValidate!: FormDataInputValidate<CreateComboInputType, CreateComboType>

  @inject('CreateComboUsecase')
  private readonly CreateComboUsecase!: CreateComboUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/combo',
      async (params: CreateComboInputType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateComboValidate.validate(params)
        return await this.CreateComboUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
  }
}
