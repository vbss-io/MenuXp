import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { ResendCodeType } from '@customers/application/whatsapp-verification/resend-code/resend-code.schema'
import { ResendCodeUsecase } from '@customers/application/whatsapp-verification/resend-code/resend-code.usecase'

export class ResendCodeController extends BaseController {
  @inject('ResendCodeValidate')
  private ResendCodeValidate!: InputValidate<ResendCodeType>

  @inject('ResendCodeUsecase')
  private ResendCodeUsecase!: ResendCodeUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/customers/whatsapp-verification/resend',
      async (params: ResendCodeType) => {
        const validatedParams = this.ResendCodeValidate.validate(params)
        return await this.ResendCodeUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
