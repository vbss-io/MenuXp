import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateLeadType } from '@customers/application/leads/create-lead/create-lead.schema'
import { CreateLeadUsecase } from '@customers/application/leads/create-lead/create-lead.usecase'

export class CreateLeadController extends BaseController {
  @inject('CreateLeadValidate')
  private readonly CreateLeadValidate!: InputValidate<CreateLeadType>

  @inject('CreateLeadUsecase')
  private readonly CreateLeadUsecase!: CreateLeadUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/leads',
      async (params: CreateLeadType) => {
        const validatedParams = this.CreateLeadValidate.validate(params)
        return await this.CreateLeadUsecase.execute(validatedParams)
      },
      HttpCode.CREATED,
      'isPublic'
    )
  }
}
