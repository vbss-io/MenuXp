import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { DeleteCouponType } from '@restaurants/application/coupons/delete-coupon/delete-coupon.schema'
import { DeleteCouponUsecase } from '@restaurants/application/coupons/delete-coupon/delete-coupon.usecase'

export class DeleteCouponController extends BaseController {
  @inject('DeleteCouponValidate')
  private readonly DeleteCouponValidate!: InputValidate<DeleteCouponType>

  @inject('DeleteCouponUsecase')
  private readonly DeleteCouponUsecase!: DeleteCouponUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.DELETE,
      '/coupon/:couponId',
      async (params: DeleteCouponType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.DeleteCouponValidate.validate(params)
        return await this.DeleteCouponUsecase.execute({ couponId: validatedParams.couponId, userId: id })
      },
      HttpCode.NO_CONTENT
    )
  }
}
