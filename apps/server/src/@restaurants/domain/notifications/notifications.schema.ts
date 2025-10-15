import { type Document, Schema, model } from 'mongoose'

import { NotificationTypeValues } from '@restaurants/domain/notifications/enums/notification-type.enum'
import { RecipientTypeValues } from '@restaurants/domain/notifications/enums/recipient-type.enum'

export interface NotificationDocument extends Document {
  _id: string
  type: string
  recipientType: string
  recipientId: string
  title: string
  message: string
  metadata?: Record<string, unknown>
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    type: {
      type: String,
      required: true,
      enum: NotificationTypeValues
    },
    recipientType: {
      type: String,
      required: true,
      enum: RecipientTypeValues
    },
    recipientId: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    metadata: {
      type: Object,
      required: false
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false
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
    collection: 'notifications',
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

notificationSchema.index({ recipientId: 1, recipientType: 1 })
notificationSchema.index({ type: 1 })
notificationSchema.index({ isRead: 1 })
notificationSchema.index({ createdAt: -1 })

export const NotificationModel = model<NotificationDocument>('Notification', notificationSchema)
