import { NotFoundError } from '@api/domain/errors/not-found.error'
import { UnauthorizedError } from '@api/domain/errors/unauthorized.error'
import { inject } from '@api/infra/dependency-injection/registry'
import { ToggleCouponStatusType } from '@restaurants/application/coupons/toggle-coupon-status/toggle-coupon-status.schema'
import { Coupon } from '@restaurants/domain/coupons/coupon.entity'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ToggleCouponStatusUsecaseInput = ToggleCouponStatusType & {
  userId: string
}

export class ToggleCouponStatusUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  async execute({ userId, couponId }: ToggleCouponStatusUsecaseInput): Promise<Coupon> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const coupon = await this.CouponRepository.findById(couponId)
    if (!coupon) throw new NotFoundError('Coupon', couponId)
    const restaurant = await this.RestaurantRepository.findById(coupon.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', coupon.restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new UnauthorizedError('User does not have permission to toggle coupon status')
    if (coupon.isActive()) {
      coupon.deactivate()
    } else {
      coupon.activate()
    }
    return await this.CouponRepository.update({ id: coupon.id }, coupon)
  }
}
