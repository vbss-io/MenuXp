import { ConflictError, UnauthorizedError } from '@api/domain/errors'
import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import { CreateCouponType } from '@restaurants/application/coupons/create-coupon/create-coupon.schema'
import { Coupon } from '@restaurants/domain/coupons/coupon.entity'
import { CouponType } from '@restaurants/domain/coupons/enums/coupon-type.enum'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type CreateCouponUsecaseInput = CreateCouponType & {
  userId: string
}

export class CreateCouponUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  async execute({ userId, ...couponData }: CreateCouponUsecaseInput): Promise<Coupon> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(couponData.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', couponData.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new UnauthorizedError('User does not have permission to create coupon')
    const existingCoupon = await this.CouponRepository.findOne({
      code: couponData.code,
      restaurantId: couponData.restaurantId
    })
    if (existingCoupon) throw new ConflictError('Coupon already exists')
    const coupon = Coupon.create({
      code: couponData.code,
      name: couponData.name,
      restaurantId: couponData.restaurantId,
      type: couponData.type as CouponType,
      value: couponData.value,
      maxUses: couponData.maxUses,
      validFrom: new Date(couponData.validFrom),
      validUntil: new Date(couponData.validUntil),
      description: couponData.description,
      minOrderValue: couponData.minOrderValue,
      maxDiscountValue: couponData.maxDiscountValue
    })
    return await this.CouponRepository.create(coupon)
  }
}
