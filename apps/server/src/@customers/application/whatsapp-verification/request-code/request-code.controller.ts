import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { RequestCodeType } from './request-code.schema'
import { RequestCodeUsecase } from './request-code.usecase'

export class RequestCodeController extends BaseController {
  @inject('RequestCodeValidate')
  private RequestCodeValidate!: InputValidate<RequestCodeType>

  @inject('RequestCodeUsecase')
  private RequestCodeUsecase!: RequestCodeUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/customers/whatsapp-verification/request',
      async (params: RequestCodeType) => {
        const validatedParams = this.RequestCodeValidate.validate(params)
        return await this.RequestCodeUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
