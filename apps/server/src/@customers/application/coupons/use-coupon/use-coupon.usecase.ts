import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { UseCouponType } from '@customers/application/coupons/use-coupon/use-coupon.schema'
import { Coupon } from '@restaurants/domain/coupons/coupon.entity'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'

export class UseCouponUsecase {
  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  async execute(input: UseCouponType): Promise<Coupon> {
    const coupon = await this.CouponRepository.findById(input.couponId)
    if (!coupon) throw new NotFoundError('Coupon', input.couponId)
    coupon.use()
    return await this.CouponRepository.update({ id: coupon.id }, coupon)
  }
}
