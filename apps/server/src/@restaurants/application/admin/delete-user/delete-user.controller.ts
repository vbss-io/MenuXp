import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { DeleteUserType } from '@restaurants/application/admin/delete-user/delete-user.schema'
import { DeleteUserUsecase } from '@restaurants/application/admin/delete-user/delete-user.usecase'

export class DeleteUserController extends BaseController {
  @inject('DeleteUserValidate')
  private readonly DeleteUserValidate!: InputValidate<DeleteUserType>

  @inject('DeleteUserUsecase')
  private readonly DeleteUserUsecase!: DeleteUserUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.DELETE,
      '/admin/user/:userId',
      async (params: DeleteUserType) => {
        const parsedData = this.DeleteUserValidate.validate(params)
        return await this.DeleteUserUsecase.execute(parsedData)
      },
      HttpCode.NO_CONTENT,
      'isAdmin'
    )
  }
}
