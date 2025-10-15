import { type Document, model, Schema } from 'mongoose'

import { type PlanCode, PlanCodeValues } from '@restaurants/domain/plans/enums/plan-code.enum'
import type { PlanFeatures } from '@restaurants/domain/plans/plan.entity'
import { planFeaturesSchema } from '@restaurants/domain/plans/plan.schema'
import { BillingCycle, BillingCycleValues } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'
import {
    SubscriptionStatus,
    SubscriptionStatusValues
} from '@restaurants/domain/subscriptions/enums/subscription-status.enum'

export interface SubscriptionDocument extends Document {
  _id: string
  userId: string
  planId: string
  status: SubscriptionStatus
  startDate: Date
  endDate?: Date
  nextBillingDate: Date
  billingCycle: BillingCycle
  planMetadata: {
    name: string
    code: PlanCode
    price: number
    currency: string
    features: PlanFeatures
  }
  externalSubscriptionId?: string
  cancelledAt?: Date
  cancelledReason?: string
  createdAt: Date
  updatedAt: Date
}

const subscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    planId: {
      type: String,
      required: true,
      ref: 'Plan'
    },
    status: {
      type: String,
      required: true,
      enum: SubscriptionStatusValues,
      default: SubscriptionStatus.ACTIVE
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    nextBillingDate: {
      type: Date,
      required: true
    },
    billingCycle: {
      type: String,
      required: true,
      enum: BillingCycleValues,
      default: BillingCycle.MONTHLY
    },
    planMetadata: {
      name: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true,
        enum: PlanCodeValues
      },
      price: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        required: true
      },
      features: {
        type: planFeaturesSchema,
        required: true
      }
    },
    externalSubscriptionId: {
      type: String,
      trim: true
    },
    cancelledAt: {
      type: Date
    },
    cancelledReason: {
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

export const SubscriptionModel = model<SubscriptionDocument>('Subscription', subscriptionSchema)

subscriptionSchema.index({ userId: 1 }, { name: 'idx_subscription_user_id' })
subscriptionSchema.index({ planId: 1 }, { name: 'idx_subscription_plan_id' })
subscriptionSchema.index({ status: 1 }, { name: 'idx_subscription_status' })
subscriptionSchema.index({ externalSubscriptionId: 1 }, { name: 'idx_subscription_external_id' })
subscriptionSchema.index({ startDate: -1 }, { name: 'idx_subscription_start_date_desc' })
subscriptionSchema.index({ nextBillingDate: 1 }, { name: 'idx_subscription_next_billing_date' })
subscriptionSchema.index({ createdAt: -1 }, { name: 'idx_subscription_created_at_desc' })
subscriptionSchema.index({ updatedAt: -1 }, { name: 'idx_subscription_updated_at_desc' })
subscriptionSchema.index({ userId: 1, status: 1 }, { name: 'idx_subscription_user_status' })
subscriptionSchema.index({ userId: 1, planId: 1 }, { name: 'idx_subscription_user_plan' })
