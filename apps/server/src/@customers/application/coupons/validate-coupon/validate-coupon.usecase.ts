import { inject } from '@api/infra/dependency-injection/registry'

import { ValidateCouponType } from '@customers/application/coupons/validate-coupon/validate-coupon.schema'

import { Coupon } from '@restaurants/domain/coupons/coupon.entity'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'

export interface ValidateCouponUsecaseOutput {
  isValid: boolean
  coupon?: Coupon
  discount?: number
  message?: string
}

export class ValidateCouponUsecase {
  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  async execute(input: ValidateCouponType): Promise<ValidateCouponUsecaseOutput> {
    const coupon = await this.CouponRepository.findOne({ code: input.code, restaurantId: input.restaurantId })
    if (!coupon) {
      return {
        isValid: false,
        message: 'Coupon not found'
      }
    }
    if (!coupon.canBeUsed()) {
      return {
        isValid: false,
        coupon,
        message: 'Coupon is not active or has expired'
      }
    }
    if (!coupon.validateOrderValue(input.orderValue)) {
      return {
        isValid: false,
        coupon,
        message: `Minimum order value required: $${coupon.minOrderValue}`
      }
    }
    const discount = coupon.calculateDiscount(input.orderValue)
    return {
      isValid: true,
      coupon,
      discount
    }
  }
}
