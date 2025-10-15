import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { UpdateCustomerUserType } from '@customers/application/users/update-customer-user/update-customer-user.schema'
import { UpdateCustomerUserUseCase } from '@customers/application/users/update-customer-user/update-customer-user.usecase'

export class UpdateCustomerUserController extends BaseController {
  @inject('UpdateCustomerUserValidate')
  private UpdateCustomerUserValidate!: InputValidate<UpdateCustomerUserType>

  @inject('UpdateCustomerUserUseCase')
  private UpdateCustomerUserUseCase!: UpdateCustomerUserUseCase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PUT,
      '/clients/:id',
      async (params: UpdateCustomerUserType) => {
        const validatedParams = this.UpdateCustomerUserValidate.validate(params)
        return await this.UpdateCustomerUserUseCase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
