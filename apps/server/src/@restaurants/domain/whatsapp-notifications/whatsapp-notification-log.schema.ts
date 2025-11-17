import { type Document, Schema, model } from 'mongoose'

export enum NotificationEventType {
  ORDER_CREATED = 'orderCreated',
  ORDER_STATUS_CHANGED = 'orderStatusChanged',
  VERIFICATION_CODE = 'verificationCode'
}

export const NotificationEventTypeValues = Object.values(NotificationEventType)

export enum NotificationStatus {
  SENT = 'sent',
  FAILED = 'failed',
  FALLBACK = 'fallback'
}

export const NotificationStatusValues = Object.values(NotificationStatus)

export interface WhatsAppNotificationLogDocument extends Document {
  _id: string
  orderId?: string
  event: NotificationEventType
  recipientPhone: string
  languageRequested: string
  languageUsed: string
  templateName: string
  status: NotificationStatus
  errorCode?: string
  errorMessage?: string
  attemptNumber: number
  correlationId: string
  timestamp: Date
  createdAt: Date
  updatedAt: Date
}

const whatsappNotificationLogSchema = new Schema<WhatsAppNotificationLogDocument>(
  {
    orderId: {
      type: String,
      required: false,
      ref: 'Order'
    },
    event: {
      type: String,
      required: true,
      enum: NotificationEventTypeValues
    },
    recipientPhone: {
      type: String,
      required: true,
      trim: true
    },
    languageRequested: {
      type: String,
      required: true,
      trim: true
    },
    languageUsed: {
      type: String,
      required: true,
      trim: true
    },
    templateName: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: NotificationStatusValues
    },
    errorCode: {
      type: String,
      required: false,
      trim: true
    },
    errorMessage: {
      type: String,
      required: false,
      trim: true
    },
    attemptNumber: {
      type: Number,
      required: true,
      default: 1
    },
    correlationId: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'whatsapp_notification_logs',
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

whatsappNotificationLogSchema.index({ orderId: 1 })
whatsappNotificationLogSchema.index({ event: 1 })
whatsappNotificationLogSchema.index({ status: 1 })
whatsappNotificationLogSchema.index({ recipientPhone: 1 })
whatsappNotificationLogSchema.index({ correlationId: 1 })
whatsappNotificationLogSchema.index({ timestamp: 1 })
whatsappNotificationLogSchema.index({ timestamp: -1 })

export const WhatsAppNotificationLogModel = model<WhatsAppNotificationLogDocument>(
  'WhatsAppNotificationLog',
  whatsappNotificationLogSchema
)
