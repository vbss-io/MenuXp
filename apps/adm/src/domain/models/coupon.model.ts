import type { CouponStatus } from '../enums/coupons/coupon-status.enum'
import type { CouponType } from '../enums/coupons/coupon-type.enum'

export interface Coupon {
  id: string
  code: string
  name: string
  description?: string
  restaurantId: string
  type: CouponType
  value: number
  status: CouponStatus
  maxUses: number
  usedCount: number
  minOrderValue?: number
  maxDiscountValue?: number
  validFrom: Date
  validUntil: Date
  createdAt: Date
  updatedAt: Date
}
