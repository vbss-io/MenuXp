import { type Document, model, Schema } from 'mongoose'

export interface StripeWebhookLogDocument extends Document {
  _id: string
  eventId: string
  eventType: string
  payloadHash: string
  processedAt: Date
  status: 'success' | 'failed'
  errorMessage?: string
  retryCount: number
  createdAt: Date
  updatedAt: Date
}

const stripeWebhookLogSchema = new Schema<StripeWebhookLogDocument>(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    eventType: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    payloadHash: {
      type: String,
      required: true,
      trim: true
    },
    processedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      required: true,
      enum: ['success', 'failed'],
      default: 'success'
    },
    errorMessage: {
      type: String,
      trim: true
    },
    retryCount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'stripe_webhook_logs',
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

stripeWebhookLogSchema.index({ eventId: 1 }, { unique: true, name: 'idx_webhook_log_event_id' })
stripeWebhookLogSchema.index({ eventType: 1 }, { name: 'idx_webhook_log_event_type' })
stripeWebhookLogSchema.index({ processedAt: -1 }, { name: 'idx_webhook_log_processed_at_desc' })
stripeWebhookLogSchema.index({ status: 1 }, { name: 'idx_webhook_log_status' })
stripeWebhookLogSchema.index({ createdAt: -1 }, { name: 'idx_webhook_log_created_at_desc' })

export const StripeWebhookLogModel = model<StripeWebhookLogDocument>('StripeWebhookLog', stripeWebhookLogSchema)
