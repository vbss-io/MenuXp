import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateRestaurantAddressType } from '@restaurants/application/restaurants/update-restaurant-address/update-restaurant-address.schema'
import { UpdateRestaurantAddressUsecase } from '@restaurants/application/restaurants/update-restaurant-address/update-restaurant-address.usecase'

export class UpdateRestaurantAddressController extends BaseController {
  @inject('UpdateRestaurantAddressValidate')
  private readonly UpdateRestaurantAddressValidate!: InputValidate<UpdateRestaurantAddressType>

  @inject('UpdateRestaurantAddressUsecase')
  private readonly UpdateRestaurantAddressUsecase!: UpdateRestaurantAddressUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/restaurant/:restaurantId/address',
      async (params: UpdateRestaurantAddressType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateRestaurantAddressValidate.validate(params)
        return await this.UpdateRestaurantAddressUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
