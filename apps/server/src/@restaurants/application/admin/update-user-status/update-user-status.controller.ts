import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateUserStatusType } from '@restaurants/application/admin/update-user-status/update-user-status.schema'
import { UpdateUserStatusUsecase } from '@restaurants/application/admin/update-user-status/update-user-status.usecase'

export class UpdateUserStatusController extends BaseController {
  @inject('UpdateUserStatusValidate')
  private readonly UpdateUserStatusValidate!: InputValidate<UpdateUserStatusType>

  @inject('UpdateUserStatusUsecase')
  private readonly UpdateUserStatusUsecase!: UpdateUserStatusUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PUT,
      '/admin/user/:userId/status',
      async (params: UpdateUserStatusType) => {
        const parsedData = this.UpdateUserStatusValidate.validate(params)
        return await this.UpdateUserStatusUsecase.execute(parsedData)
      },
      HttpCode.NO_CONTENT,
      'isAdmin'
    )
  }
}
