import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantBySlugType } from '@restaurants/application/restaurants/get-restaurant-by-slug/get-restaurant-by-slug.schema'
import { GetRestaurantBySlugUsecase } from '@restaurants/application/restaurants/get-restaurant-by-slug/get-restaurant-by-slug.usecase'

export class GetRestaurantBySlugController extends BaseController {
  @inject('GetRestaurantBySlugValidate')
  private readonly GetRestaurantBySlugValidate!: InputValidate<GetRestaurantBySlugType>

  @inject('GetRestaurantBySlugUsecase')
  private readonly GetRestaurantBySlugUsecase!: GetRestaurantBySlugUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/restaurant/slug/:slug',
      async (params: GetRestaurantBySlugType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetRestaurantBySlugValidate.validate(params)
        return await this.GetRestaurantBySlugUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
