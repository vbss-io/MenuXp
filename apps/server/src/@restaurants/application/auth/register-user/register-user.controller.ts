import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { RegisterUserType } from '@restaurants/application/auth/register-user/register-user.schema'
import { RegisterUserUsecase } from '@restaurants/application/auth/register-user/register-user.usecase'

export class RegisterUserController extends BaseController {
  @inject('RegisterUserValidate')
  private readonly RegisterUserValidate!: InputValidate<RegisterUserType>

  @inject('RegisterUserUsecase')
  private readonly RegisterUserUsecase!: RegisterUserUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/auth/register',
      async (params: RegisterUserType) => {
        const parsedData = this.RegisterUserValidate.validate(params)
        return await this.RegisterUserUsecase.execute(parsedData)
      },
      HttpCode.CREATED,
      'isPublic'
    )
  }
}
