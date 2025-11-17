import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UseCouponType } from '@customers/application/coupons/use-coupon/use-coupon.schema'
import { UseCouponUsecase } from '@customers/application/coupons/use-coupon/use-coupon.usecase'

export class UseCouponController extends BaseController {
  @inject('UseCouponValidate')
  private readonly UseCouponValidate!: InputValidate<UseCouponType>

  @inject('UseCouponUsecase')
  private readonly UseCouponUsecase!: UseCouponUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/coupons/:couponId/use',
      async (params: UseCouponType) => {
        const validatedParams = this.UseCouponValidate.validate(params)
        return await this.UseCouponUsecase.execute(validatedParams)
      },
      HttpCode.CREATED,
      'isPublic'
    )
  }
}
