import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { DeleteCouponType } from '@restaurants/application/coupons/delete-coupon/delete-coupon.schema'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type DeleteCouponUsecaseInput = DeleteCouponType & {
  userId: string
}

export class DeleteCouponUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  async execute({ userId, couponId }: DeleteCouponUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const coupon = await this.CouponRepository.findById(couponId)
    if (!coupon) throw new NotFoundError('Coupon', couponId)
    const restaurant = await this.RestaurantRepository.findById(coupon.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', coupon.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to delete coupon')
    await this.CouponRepository.delete({ id: couponId })
  }
}
