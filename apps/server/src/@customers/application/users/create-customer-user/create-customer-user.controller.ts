import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { CreateCustomerUserType } from '@customers/application/users/create-customer-user/create-customer-user.schema'
import { CreateCustomerUserUsecase } from '@customers/application/users/create-customer-user/create-customer-user.usecase'

export class CreateCustomerUserController extends BaseController {
  @inject('CreateCustomerUserValidate')
  private CreateCustomerUserValidate!: InputValidate<CreateCustomerUserType>

  @inject('CreateCustomerUserUsecase')
  private CreateCustomerUserUsecase!: CreateCustomerUserUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/clients',
      async (params: CreateCustomerUserType) => {
        const validatedParams = this.CreateCustomerUserValidate.validate(params)
        return await this.CreateCustomerUserUsecase.execute(validatedParams)
      },
      HttpCode.CREATED,
      'isPublic'
    )
  }
}
