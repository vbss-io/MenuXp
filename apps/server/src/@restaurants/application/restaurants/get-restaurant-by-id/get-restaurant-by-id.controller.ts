import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantByIdType } from '@restaurants/application/restaurants/get-restaurant-by-id/get-restaurant-by-id.schema'
import { GetRestaurantByIdUsecase } from '@restaurants/application/restaurants/get-restaurant-by-id/get-restaurant-by-id.usecase'

export class GetRestaurantByIdController extends BaseController {
  @inject('GetRestaurantByIdValidate')
  private readonly GetRestaurantByIdValidate!: InputValidate<GetRestaurantByIdType>

  @inject('GetRestaurantByIdUsecase')
  private readonly GetRestaurantByIdUsecase!: GetRestaurantByIdUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/restaurant/:restaurantId',
      async (params: GetRestaurantByIdType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetRestaurantByIdValidate.validate(params)
        return await this.GetRestaurantByIdUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
