import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantCouponsType } from '@restaurants/application/coupons/get-restaurant-coupons/get-restaurant-coupons.schema'
import { GetRestaurantCouponsUsecase } from '@restaurants/application/coupons/get-restaurant-coupons/get-restaurant-coupons.usecase'

export class GetRestaurantCouponsController extends BaseController {
  @inject('GetRestaurantCouponsValidate')
  private readonly GetRestaurantCouponsValidate!: InputValidate<GetRestaurantCouponsType>

  @inject('GetRestaurantCouponsUsecase')
  private readonly GetRestaurantCouponsUsecase!: GetRestaurantCouponsUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/coupons',
      async (params: GetRestaurantCouponsType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetRestaurantCouponsValidate.validate(params)
        return await this.GetRestaurantCouponsUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
