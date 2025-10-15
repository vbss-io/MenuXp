import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { MarkCustomerNotificationAsReadType } from '@customers/application/notifications/mark-notification-as-read/mark-as-read.schema'
import { MarkCustomerNotificationAsReadUsecase } from '@customers/application/notifications/mark-notification-as-read/mark-as-read.usecase'

export class MarkCustomerNotificationAsReadController extends BaseController {
  @inject('MarkCustomerNotificationAsReadValidate')
  private readonly MarkCustomerNotificationAsReadValidate!: InputValidate<MarkCustomerNotificationAsReadType>

  @inject('MarkCustomerNotificationAsReadUsecase')
  private readonly MarkCustomerNotificationAsReadUsecase!: MarkCustomerNotificationAsReadUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/customer/notification/:notificationId/read',
      async (params: MarkCustomerNotificationAsReadType) => {
        const validatedParams = this.MarkCustomerNotificationAsReadValidate.validate(params)
        await this.MarkCustomerNotificationAsReadUsecase.execute(validatedParams)
      },
      HttpCode.NO_CONTENT,
      'isPublic'
    )
  }
}
