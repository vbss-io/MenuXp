import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateRestaurantSettingsType } from '@restaurants/application/restaurants/update-restaurant-settings/update-restaurant-settings.schema'
import { UpdateRestaurantSettingsUsecase } from '@restaurants/application/restaurants/update-restaurant-settings/update-restaurant-settings.usecase'

export class UpdateRestaurantSettingsController extends BaseController {
  @inject('UpdateRestaurantSettingsValidate')
  private readonly UpdateRestaurantSettingsValidate!: InputValidate<UpdateRestaurantSettingsType>

  @inject('UpdateRestaurantSettingsUsecase')
  private readonly UpdateRestaurantSettingsUsecase!: UpdateRestaurantSettingsUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/restaurant/:restaurantId/settings',
      async (params: UpdateRestaurantSettingsType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateRestaurantSettingsValidate.validate(params)
        return await this.UpdateRestaurantSettingsUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
