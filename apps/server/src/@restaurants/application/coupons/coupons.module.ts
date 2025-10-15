import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { CreateCouponController } from '@restaurants/application/coupons/create-coupon/create-coupon.controller'
import { CreateCouponSchema } from '@restaurants/application/coupons/create-coupon/create-coupon.schema'
import { CreateCouponUsecase } from '@restaurants/application/coupons/create-coupon/create-coupon.usecase'
import { DeleteCouponController } from '@restaurants/application/coupons/delete-coupon/delete-coupon.controller'
import { DeleteCouponSchema } from '@restaurants/application/coupons/delete-coupon/delete-coupon.schema'
import { DeleteCouponUsecase } from '@restaurants/application/coupons/delete-coupon/delete-coupon.usecase'
import { GetRestaurantCouponsController } from '@restaurants/application/coupons/get-restaurant-coupons/get-restaurant-coupons.controller'
import { GetRestaurantCouponsSchema } from '@restaurants/application/coupons/get-restaurant-coupons/get-restaurant-coupons.schema'
import { GetRestaurantCouponsUsecase } from '@restaurants/application/coupons/get-restaurant-coupons/get-restaurant-coupons.usecase'
import { ToggleCouponStatusController } from '@restaurants/application/coupons/toggle-coupon-status/toggle-coupon-status.controller'
import { ToggleCouponStatusSchema } from '@restaurants/application/coupons/toggle-coupon-status/toggle-coupon-status.schema'
import { ToggleCouponStatusUsecase } from '@restaurants/application/coupons/toggle-coupon-status/toggle-coupon-status.usecase'
import { UpdateCouponController } from '@restaurants/application/coupons/update-coupon/update-coupon.controller'
import { UpdateCouponSchema } from '@restaurants/application/coupons/update-coupon/update-coupon.schema'
import { UpdateCouponUsecase } from '@restaurants/application/coupons/update-coupon/update-coupon.usecase'

export class CouponsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('CreateCouponValidate', new ZodAdapter(CreateCouponSchema))
    registry.provide('CreateCouponUsecase', new CreateCouponUsecase())
    new CreateCouponController()

    registry.provide('DeleteCouponValidate', new ZodAdapter(DeleteCouponSchema))
    registry.provide('DeleteCouponUsecase', new DeleteCouponUsecase())
    new DeleteCouponController()

    registry.provide('GetRestaurantCouponsValidate', new ZodAdapter(GetRestaurantCouponsSchema))
    registry.provide('GetRestaurantCouponsUsecase', new GetRestaurantCouponsUsecase())
    new GetRestaurantCouponsController()

    registry.provide('ToggleCouponStatusValidate', new ZodAdapter(ToggleCouponStatusSchema))
    registry.provide('ToggleCouponStatusUsecase', new ToggleCouponStatusUsecase())
    new ToggleCouponStatusController()

    registry.provide('UpdateCouponValidate', new ZodAdapter(UpdateCouponSchema))
    registry.provide('UpdateCouponUsecase', new UpdateCouponUsecase())
    new UpdateCouponController()
  }
}
