import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { FindCustomerUserByPhoneType } from '@customers/application/users/find-customer-user-by-phone/find-customer-user-by-phone.schema'
import { FindCustomerUserByPhoneUsecase } from '@customers/application/users/find-customer-user-by-phone/find-customer-user-by-phone.usecase'

export class FindCustomerUserController extends BaseController {
  @inject('FindCustomerUserByPhoneValidate')
  private FindCustomerUserByPhoneValidate!: InputValidate<FindCustomerUserByPhoneType>

  @inject('FindCustomerUserByPhoneUsecase')
  private FindCustomerUserByPhoneUsecase!: FindCustomerUserByPhoneUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/clients/:restaurantId/:phone',
      async (params: FindCustomerUserByPhoneType) => {
        const validatedParams = this.FindCustomerUserByPhoneValidate.validate(params)
        return await this.FindCustomerUserByPhoneUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
