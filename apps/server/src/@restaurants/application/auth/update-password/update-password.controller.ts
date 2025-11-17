import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdatePasswordType } from '@restaurants/application/auth/update-password/update-password.schema'
import { UpdatePasswordUsecase } from '@restaurants/application/auth/update-password/update-password.usecase'

export class UpdatePasswordController extends BaseController {
  @inject('UpdatePasswordValidate')
  private readonly UpdatePasswordValidate!: InputValidate<UpdatePasswordType>

  @inject('UpdatePasswordUsecase')
  private readonly UpdatePasswordUsecase!: UpdatePasswordUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/auth/update-password',
      async (params: UpdatePasswordType) => {
        const { id } = this.RequestFacade.getUser()
        const parsedData = this.UpdatePasswordValidate.validate(params)
        return await this.UpdatePasswordUsecase.execute({ id, ...parsedData })
      },
      HttpCode.NO_CONTENT
    )
  }
}
