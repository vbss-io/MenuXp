import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'
import { VerifyEmailUsecase } from '@restaurants/application/auth/verify-email/verify-email.usecase'

export class VerifyEmailController extends BaseController {
  @inject('VerifyEmailUsecase')
  private readonly VerifyEmailUsecase!: VerifyEmailUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/auth/verify-email',
      async () => {
        const { id } = this.RequestFacade.getUser()
        return await this.VerifyEmailUsecase.execute({ id })
      },
      HttpCode.NO_CONTENT
    )
  }
}
