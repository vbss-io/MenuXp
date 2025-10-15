import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { LoginUserType } from '@restaurants/application/auth/login-user/login-user.schema'
import { LoginUserUsecase } from '@restaurants/application/auth/login-user/login-user.usecase'

export class LoginUserController extends BaseController {
  @inject('LoginUserValidate')
  private readonly LoginUserValidate!: InputValidate<LoginUserType>

  @inject('LoginUserUsecase')
  private readonly LoginUserUsecase!: LoginUserUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/auth/login',
      async (params: LoginUserType) => {
        const parsedData = this.LoginUserValidate.validate(params)
        return await this.LoginUserUsecase.execute(parsedData)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
