import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ValidateCouponType } from '@customers/application/coupons/validate-coupon/validate-coupon.schema'
import { ValidateCouponUsecase } from '@customers/application/coupons/validate-coupon/validate-coupon.usecase'

export class ValidateCouponController extends BaseController {
  @inject('ValidateCouponValidate')
  private readonly ValidateCouponValidate!: InputValidate<ValidateCouponType>

  @inject('ValidateCouponUsecase')
  private readonly ValidateCouponUsecase!: ValidateCouponUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/coupon/validate',
      async (params: ValidateCouponType) => {
        const validatedParams = this.ValidateCouponValidate.validate(params)
        return await this.ValidateCouponUsecase.execute(validatedParams)
      },
      HttpCode.OK
    )
  }
}
