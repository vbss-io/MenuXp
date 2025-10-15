import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantCouponsType } from '@restaurants/application/coupons/get-restaurant-coupons/get-restaurant-coupons.schema'
import { Coupon } from '@restaurants/domain/coupons/coupon.entity'
import { CouponStatus } from '@restaurants/domain/coupons/enums/coupon-status.enum'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetRestaurantCouponsUsecaseInput = GetRestaurantCouponsType & {
  userId: string
}

export class GetRestaurantCouponsUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  async execute({ userId, ...queryData }: GetRestaurantCouponsUsecaseInput): Promise<Coupon[]> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(queryData.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', queryData.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new Error('Unauthorized')
    let coupons: Coupon[]
    if (queryData.includeInactive) {
      coupons = await this.CouponRepository.find({ restaurantId: queryData.restaurantId })
    } else {
      coupons = await this.CouponRepository.find({ restaurantId: queryData.restaurantId, status: CouponStatus.ACTIVE })
    }
    return coupons
  }
}
