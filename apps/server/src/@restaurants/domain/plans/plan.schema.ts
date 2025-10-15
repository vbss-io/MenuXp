import { type Document, model, Schema } from 'mongoose'

import { PlanCode, PlanCodeValues } from '@restaurants/domain/plans/enums/plan-code.enum'
import type { PlanFeatures } from '@restaurants/domain/plans/plan.entity'

export interface PlanDocument extends Document {
  _id: string
  name: string
  code: PlanCode
  price: number
  yearlyDiscount: number
  currency: string
  isActive: boolean
  features: PlanFeatures
  description?: string
  monthlyPriceId?: string
  yearlyPriceId?: string
  createdAt: Date
  updatedAt: Date
}

export const planFeaturesSchema = new Schema<PlanFeatures>({
  menuItems: {
    type: Number,
    nullable: true,
    default: null
  },
  monthlyOrders: {
    type: Number,
    nullable: true,
    default: null
  },
  staffMembers: {
    type: Number,
    required: true,
    min: 0
  },
  customDomain: {
    type: Boolean,
    required: true
  },
  removePoweredBy: {
    type: Boolean,
    required: true
  },
  onlinePayment: {
    type: Boolean,
    required: true
  },
  hasCoupons: {
    type: Boolean,
    required: true
  },
  activeCoupons: {
    type: Number,
    nullable: true,
    default: null
  },
  hasCampaigns: {
    type: Boolean,
    required: true
  },
  hasAdvancedAnalytics: {
    type: Boolean,
    required: true
  },
  menuLayouts: {
    type: Number,
    required: true,
    min: 0
  },
  maxStorage: {
    type: Number,
    nullable: true,
    default: null
  }
})

const planSchema = new Schema<PlanDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      enum: PlanCodeValues,
      default: PlanCode.FREE
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    yearlyDiscount: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },
    currency: {
      type: String,
      required: true,
      default: 'BRL',
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    features: {
      type: planFeaturesSchema,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    monthlyPriceId: {
      type: String,
      trim: true
    },
    yearlyPriceId: {
      type: String,
      trim: true
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
        ret.id = ret._id as string
        delete (ret as any)._id
        return ret
      }
    }
  }
)

export const PlanModel = model<PlanDocument>('Plan', planSchema)

planSchema.index({ isActive: 1 }, { name: 'idx_plan_is_active' })
planSchema.index({ price: 1 }, { name: 'idx_plan_price' })
planSchema.index({ createdAt: -1 }, { name: 'idx_plan_created_at_desc' })
planSchema.index({ updatedAt: -1 }, { name: 'idx_plan_updated_at_desc' })
planSchema.index({ isActive: 1, price: 1 }, { name: 'idx_plan_active_price' })
