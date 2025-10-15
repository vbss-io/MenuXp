import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ResetPasswordType } from '@restaurants/application/auth/reset-password/reset-password.schema'
import { ResetPasswordUsecase } from '@restaurants/application/auth/reset-password/reset-password.usecase'
import { UpdatePasswordType } from '@restaurants/application/auth/update-password/update-password.schema'

export class ResetPasswordController extends BaseController {
  @inject('ResetPasswordValidate')
  private readonly ResetPasswordValidate!: InputValidate<ResetPasswordType>

  @inject('ResetPasswordUsecase')
  private readonly ResetPasswordUsecase!: ResetPasswordUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/auth/reset-password',
      async (params: UpdatePasswordType) => {
        const { id } = this.RequestFacade.getUser()
        const parsedData = this.ResetPasswordValidate.validate(params)
        return await this.ResetPasswordUsecase.execute({ id, ...parsedData })
      },
      HttpCode.NO_CONTENT
    )
  }
}
