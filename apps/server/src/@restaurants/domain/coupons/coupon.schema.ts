import { type Document, Schema, model } from 'mongoose'

import { CouponStatus, CouponStatusValues } from '@restaurants/domain/coupons/enums/coupon-status.enum'
import { type CouponType, CouponTypeValues } from '@restaurants/domain/coupons/enums/coupon-type.enum'

export interface CouponDocument extends Document {
  _id: string
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

const couponSchema = new Schema<CouponDocument>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
    },
    type: {
      type: String,
      required: true,
      enum: CouponTypeValues
    },
    value: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      required: true,
      enum: CouponStatusValues,
      default: CouponStatus.ACTIVE
    },
    maxUses: {
      type: Number,
      required: true,
      min: 1
    },
    usedCount: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    minOrderValue: {
      type: Number,
      required: false,
      min: 0
    },
    maxDiscountValue: {
      type: Number,
      required: false,
      min: 0
    },
    validFrom: {
      type: Date,
      required: true
    },
    validUntil: {
      type: Date,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      transform: (_, ret) => {
        ret.id = ret._id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (ret as any)._id
        return ret
      }
    }
  }
)

couponSchema.index({ restaurantId: 1 })
couponSchema.index({ code: 1 })
couponSchema.index({ restaurantId: 1, code: 1 }, { unique: true })
couponSchema.index({ status: 1 })
couponSchema.index({ validUntil: 1 })
couponSchema.index({ validFrom: 1, validUntil: 1 })

export const CouponModel = model<CouponDocument>('Coupon', couponSchema)
