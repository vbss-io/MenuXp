import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { GetCustomerNotificationsType } from '@customers/application/notifications/get-customer-notifications/get-customer-notifications.schema'
import { GetCustomerNotificationsUsecase } from '@customers/application/notifications/get-customer-notifications/get-customer-notifications.usecase'

export class GetCustomerNotificationsController extends BaseController {
  @inject('GetCustomerNotificationsValidate')
  private readonly GetCustomerNotificationsValidate!: InputValidate<GetCustomerNotificationsType>

  @inject('GetCustomerNotificationsUsecase')
  private readonly GetCustomerNotificationsUsecase!: GetCustomerNotificationsUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/customer/:customerId/notifications',
      async (params: GetCustomerNotificationsType) => {
        const validatedParams = this.GetCustomerNotificationsValidate.validate(params)
        return await this.GetCustomerNotificationsUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
