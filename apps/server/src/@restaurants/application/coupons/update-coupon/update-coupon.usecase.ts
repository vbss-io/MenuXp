import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateCouponType } from '@restaurants/application/coupons/update-coupon/update-coupon.schema'
import { Coupon } from '@restaurants/domain/coupons/coupon.entity'
import { CouponStatus } from '@restaurants/domain/coupons/enums/coupon-status.enum'
import { CouponType } from '@restaurants/domain/coupons/enums/coupon-type.enum'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateCouponUsecaseInput = UpdateCouponType & {
  userId: string
}

export class UpdateCouponUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  async execute({ userId, couponId, ...updateData }: UpdateCouponUsecaseInput): Promise<Coupon> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const coupon = await this.CouponRepository.findById(couponId)
    if (!coupon) throw new NotFoundError('Coupon', couponId)
    const restaurant = await this.RestaurantRepository.findById(coupon.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', coupon.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new Error('Unauthorized')

    coupon.update({
      name: updateData.name,
      description: updateData.description,
      type: updateData.type as CouponType | undefined,
      value: updateData.value,
      maxUses: updateData.maxUses,
      validFrom: updateData.validFrom ? new Date(updateData.validFrom) : undefined,
      validUntil: updateData.validUntil ? new Date(updateData.validUntil) : undefined,
      minOrderValue: updateData.minOrderValue,
      maxDiscountValue: updateData.maxDiscountValue,
      status: updateData.status as CouponStatus | undefined
    })
    await this.CouponRepository.update({ id: coupon.id }, coupon)
    return coupon
  }
}
