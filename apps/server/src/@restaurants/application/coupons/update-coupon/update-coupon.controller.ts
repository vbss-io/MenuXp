import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateCouponType } from '@restaurants/application/coupons/update-coupon/update-coupon.schema'
import { UpdateCouponUsecase } from '@restaurants/application/coupons/update-coupon/update-coupon.usecase'

export class UpdateCouponController extends BaseController {
  @inject('UpdateCouponValidate')
  private readonly UpdateCouponValidate!: InputValidate<UpdateCouponType>

  @inject('UpdateCouponUsecase')
  private readonly UpdateCouponUsecase!: UpdateCouponUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PUT,
      '/coupon/:couponId',
      async (params: UpdateCouponType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateCouponValidate.validate(params)
        return await this.UpdateCouponUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
