import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ForgotPasswordType } from '@restaurants/application/auth/forgot-password/forgot-password.schema'
import { ResentEmailConfirmationType } from '@restaurants/application/auth/resent-email-confirmation/resent-email-confirmation.schema'
import { ResentConfirmationUsecase } from '@restaurants/application/auth/resent-email-confirmation/resent-email-confirmation.usecase'

export class ResentEmailConfirmationController extends BaseController {
  @inject('ResentConfirmationValidate')
  private readonly ResentConfirmationValidate!: InputValidate<ResentEmailConfirmationType>

  @inject('ResentConfirmationUsecase')
  private readonly ResentConfirmationUsecase!: ResentConfirmationUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/auth/resent-confirmation',
      async (params: ForgotPasswordType) => {
        const parsedData = this.ResentConfirmationValidate.validate(params)
        return await this.ResentConfirmationUsecase.execute(parsedData)
      },
      HttpCode.NO_CONTENT,
      'isPublic'
    )
  }
}
