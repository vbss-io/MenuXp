import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { VerifyCodeType } from '@customers/application/whatsapp-verification/verify-code/verify-code.schema'
import { VerifyCodeUsecase } from '@customers/application/whatsapp-verification/verify-code/verify-code.usecase'

export class VerifyCodeController extends BaseController {
  @inject('VerifyCodeValidate')
  private VerifyCodeValidate!: InputValidate<VerifyCodeType>

  @inject('VerifyCodeUsecase')
  private VerifyCodeUsecase!: VerifyCodeUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/customers/whatsapp-verification/verify',
      async (params: VerifyCodeType) => {
        const validatedParams = this.VerifyCodeValidate.validate(params)
        return await this.VerifyCodeUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
