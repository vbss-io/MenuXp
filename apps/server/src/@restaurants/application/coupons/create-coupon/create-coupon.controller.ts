import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateCouponType } from '@restaurants/application/coupons/create-coupon/create-coupon.schema'
import { CreateCouponUsecase } from '@restaurants/application/coupons/create-coupon/create-coupon.usecase'

export class CreateCouponController extends BaseController {
  @inject('CreateCouponValidate')
  private readonly CreateCouponValidate!: InputValidate<CreateCouponType>

  @inject('CreateCouponUsecase')
  private readonly CreateCouponUsecase!: CreateCouponUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/coupon',
      async (params: CreateCouponType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateCouponValidate.validate(params)
        return await this.CreateCouponUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
  }
}
