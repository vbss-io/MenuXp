import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { GetRestaurantNotificationsType } from '@restaurants/application/notifications/get-restaurant-notifications/get-restaurant-notifications.schema'
import { GetRestaurantNotificationsUsecase } from '@restaurants/application/notifications/get-restaurant-notifications/get-restaurant-notifications.usecase'

export class GetRestaurantNotificationsController extends BaseController {
  @inject('GetRestaurantNotificationsValidate')
  private readonly GetRestaurantNotificationsValidate!: InputValidate<GetRestaurantNotificationsType>

  @inject('GetRestaurantNotificationsUsecase')
  private readonly GetRestaurantNotificationsUsecase!: GetRestaurantNotificationsUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/restaurant/:restaurantId/notifications',
      async (params: GetRestaurantNotificationsType) => {
        const { id: userId } = this.RequestFacade.getUser()
        const validatedParams = this.GetRestaurantNotificationsValidate.validate(params)
        return await this.GetRestaurantNotificationsUsecase.execute({ userId, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
