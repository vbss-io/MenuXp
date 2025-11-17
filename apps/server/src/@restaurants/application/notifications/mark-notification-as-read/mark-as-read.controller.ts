import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { MarkNotificationAsReadType } from '@restaurants/application/notifications/mark-notification-as-read/mark-as-read.schema'
import { MarkNotificationAsReadUsecase } from '@restaurants/application/notifications/mark-notification-as-read/mark-as-read.usecase'

export class MarkNotificationAsReadController extends BaseController {
  @inject('MarkNotificationAsReadValidate')
  private readonly MarkNotificationAsReadValidate!: InputValidate<MarkNotificationAsReadType>

  @inject('MarkNotificationAsReadUsecase')
  private readonly MarkNotificationAsReadUsecase!: MarkNotificationAsReadUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/notification/:notificationId/read',
      async (params: MarkNotificationAsReadType) => {
        const { id: userId } = this.RequestFacade.getUser()
        const validatedParams = this.MarkNotificationAsReadValidate.validate(params)
        await this.MarkNotificationAsReadUsecase.execute({ userId, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
