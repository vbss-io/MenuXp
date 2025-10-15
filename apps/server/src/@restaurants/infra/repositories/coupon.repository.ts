import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Coupon } from '@restaurants/domain/coupons/coupon.entity'
import { type CouponDocument, CouponModel } from '@restaurants/domain/coupons/coupon.schema'

export interface CouponRepository<T = unknown> extends BaseRepository<T, Coupon> {
  toDomain(coupon: T): Coupon
}

export class CouponRepositoryMongoose
  extends BaseRepositoryMongoose<CouponDocument, Coupon>
  implements CouponRepository<CouponDocument>
{
  constructor(model = CouponModel) {
    super(model)
  }

  toDomain(entity: CouponDocument): Coupon {
    return Coupon.restore({
      id: entity._id.toString(),
      code: entity.code,
      name: entity.name,
      restaurantId: entity.restaurantId,
      type: entity.type,
      value: entity.value,
      status: entity.status,
      maxUses: entity.maxUses,
      usedCount: entity.usedCount,
      validFrom: entity.validFrom,
      validUntil: entity.validUntil,
      description: entity.description,
      minOrderValue: entity.minOrderValue,
      maxDiscountValue: entity.maxDiscountValue,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
