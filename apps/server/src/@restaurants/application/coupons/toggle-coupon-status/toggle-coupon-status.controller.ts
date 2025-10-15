import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ToggleCouponStatusType } from '@restaurants/application/coupons/toggle-coupon-status/toggle-coupon-status.schema'
import { ToggleCouponStatusUsecase } from '@restaurants/application/coupons/toggle-coupon-status/toggle-coupon-status.usecase'

export class ToggleCouponStatusController extends BaseController {
  @inject('ToggleCouponStatusValidate')
  private readonly ToggleCouponStatusValidate!: InputValidate<ToggleCouponStatusType>

  @inject('ToggleCouponStatusUsecase')
  private readonly ToggleCouponStatusUsecase!: ToggleCouponStatusUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/coupon/:couponId/toggle-status',
      async (params: ToggleCouponStatusType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.ToggleCouponStatusValidate.validate(params)
        return await this.ToggleCouponStatusUsecase.execute({ couponId: validatedParams.couponId, userId: id })
      },
      HttpCode.NO_CONTENT
    )
  }
}
