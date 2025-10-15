import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ForgotPasswordType } from '@restaurants/application/auth/forgot-password/forgot-password.schema'
import { ForgotPasswordUsecase } from '@restaurants/application/auth/forgot-password/forgot-password.usecase'

export class ForgotPasswordController extends BaseController {
  @inject('ForgotPasswordValidate')
  private readonly ForgotPasswordValidate!: InputValidate<ForgotPasswordType>

  @inject('ForgotPasswordUsecase')
  private readonly ForgotPasswordUsecase!: ForgotPasswordUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/auth/forgot-password',
      async (params: ForgotPasswordType) => {
        const parsedData = this.ForgotPasswordValidate.validate(params)
        return await this.ForgotPasswordUsecase.execute(parsedData)
      },
      HttpCode.NO_CONTENT,
      'isPublic'
    )
  }
}
