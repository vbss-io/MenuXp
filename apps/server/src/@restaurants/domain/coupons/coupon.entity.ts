import { CouponStatus } from '@restaurants/domain/coupons/enums/coupon-status.enum'
import { CouponType } from '@restaurants/domain/coupons/enums/coupon-type.enum'

export class Coupon {
  code: string
  name: string
  description?: string
  type: CouponType
  value: number
  status: CouponStatus
  maxUses: number
  usedCount: number
  minOrderValue?: number
  maxDiscountValue?: number
  validFrom: Date
  validUntil: Date

  private constructor(
    readonly id: string | undefined,
    code: string,
    name: string,
    readonly restaurantId: string,
    type: CouponType,
    value: number,
    status: CouponStatus,
    maxUses: number,
    usedCount: number,
    validFrom: Date,
    validUntil: Date,
    description?: string,
    minOrderValue?: number,
    maxDiscountValue?: number,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.code = code.toUpperCase()
    this.name = name
    this.description = description
    this.type = type
    this.value = value
    this.status = status
    this.maxUses = maxUses
    this.usedCount = usedCount
    this.minOrderValue = minOrderValue
    this.maxDiscountValue = maxDiscountValue
    this.validFrom = validFrom
    this.validUntil = validUntil
  }

  static create(input: CreateCoupon): Coupon {
    return new Coupon(
      undefined,
      input.code,
      input.name,
      input.restaurantId,
      input.type,
      input.value,
      CouponStatus.ACTIVE,
      input.maxUses,
      0,
      input.validFrom,
      input.validUntil,
      input.description,
      input.minOrderValue,
      input.maxDiscountValue
    )
  }

  static restore(input: RestoreCoupon): Coupon {
    return new Coupon(
      input.id,
      input.code,
      input.name,
      input.restaurantId,
      input.type,
      input.value,
      input.status,
      input.maxUses,
      input.usedCount,
      input.validFrom,
      input.validUntil,
      input.description,
      input.minOrderValue,
      input.maxDiscountValue,
      input.createdAt,
      input.updatedAt
    )
  }

  update(input: Partial<Coupon>): void {
    this.name = input.name ?? this.name
    this.description = input.description ?? this.description
    this.type = input.type ?? this.type
    this.value = input.value ?? this.value
    this.status = input.status ?? this.status
    this.maxUses = input.maxUses ?? this.maxUses
    this.minOrderValue = input.minOrderValue ?? this.minOrderValue
    this.maxDiscountValue = input.maxDiscountValue ?? this.maxDiscountValue
    this.validFrom = input.validFrom ?? this.validFrom
    this.validUntil = input.validUntil ?? this.validUntil
  }

  isActive(): boolean {
    const now = new Date()
    return (
      this.status === CouponStatus.ACTIVE &&
      now >= this.validFrom &&
      now <= this.validUntil &&
      this.usedCount < this.maxUses
    )
  }

  isExpired(): boolean {
    const now = new Date()
    return now > this.validUntil
  }

  canBeUsed(): boolean {
    return this.isActive() && this.usedCount < this.maxUses
  }

  getRemainingUses(): number {
    return Math.max(0, this.maxUses - this.usedCount)
  }

  calculateDiscount(orderValue: number): number {
    if (!this.canBeUsed()) return 0
    if (this.minOrderValue && orderValue < this.minOrderValue) return 0
    let discount = 0
    if (this.type === CouponType.PERCENTAGE) {
      discount = (orderValue * this.value) / 100
    } else {
      discount = this.value
    }
    if (this.maxDiscountValue && discount > this.maxDiscountValue) {
      discount = this.maxDiscountValue
    }
    return Math.min(discount, orderValue)
  }

  use(): void {
    if (!this.canBeUsed()) {
      throw new Error('Coupon cannot be used')
    }
    this.usedCount++
    if (this.usedCount >= this.maxUses) {
      this.status = CouponStatus.INACTIVE
    }
  }

  activate(): void {
    this.status = CouponStatus.ACTIVE
  }

  deactivate(): void {
    this.status = CouponStatus.INACTIVE
  }

  validateOrderValue(orderValue: number): boolean {
    if (!this.minOrderValue) return true
    return orderValue >= this.minOrderValue
  }
}

export interface CreateCoupon {
  code: string
  name: string
  restaurantId: string
  type: CouponType
  value: number
  maxUses: number
  validFrom: Date
  validUntil: Date
  description?: string
  minOrderValue?: number
  maxDiscountValue?: number
}

type RestoreCoupon = CreateCoupon & {
  id: string
  status: CouponStatus
  usedCount: number
  createdAt: Date
  updatedAt: Date
}
