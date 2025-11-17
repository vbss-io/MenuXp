import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import {
  CreateRestaurantInputType,
  CreateRestaurantType
} from '@restaurants/application/restaurants/create-restaurant/create-restaurant.schema'
import { CreateRestaurantUsecase } from '@restaurants/application/restaurants/create-restaurant/create-restaurant.usecase'

export class CreateRestaurantController extends BaseController {
  @inject('CreateRestaurantValidate')
  private readonly CreateRestaurantValidate!: FormDataInputValidate<CreateRestaurantInputType, CreateRestaurantType>
  @inject('CreateRestaurantUsecase')
  private readonly CreateRestaurantUsecase!: CreateRestaurantUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/restaurant',
      async (params: CreateRestaurantInputType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateRestaurantValidate.validate(params)
        return await this.CreateRestaurantUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
  }
}
