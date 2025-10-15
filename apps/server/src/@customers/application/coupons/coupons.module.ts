import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { UseCouponController } from '@customers/application/coupons/use-coupon/use-coupon.controller'
import { UseCouponSchema } from '@customers/application/coupons/use-coupon/use-coupon.schema'
import { UseCouponUsecase } from '@customers/application/coupons/use-coupon/use-coupon.usecase'
import { ValidateCouponController } from '@customers/application/coupons/validate-coupon/validate-coupon.controller'
import { ValidateCouponSchema } from '@customers/application/coupons/validate-coupon/validate-coupon.schema'
import { ValidateCouponUsecase } from '@customers/application/coupons/validate-coupon/validate-coupon.usecase'

export class CouponsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('UseCouponValidate', new ZodAdapter(UseCouponSchema))
    registry.provide('UseCouponUsecase', new UseCouponUsecase())
    new UseCouponController()

    registry.provide('ValidateCouponValidate', new ZodAdapter(ValidateCouponSchema))
    registry.provide('ValidateCouponUsecase', new ValidateCouponUsecase())
    new ValidateCouponController()
  }
}
