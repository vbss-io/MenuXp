import { type Document, Schema, model } from 'mongoose'

import { WHATSAPP_VERIFICATION_TTL_SECONDS } from '@api/domain/consts/timeouts.const'

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  EXPIRED = 'expired'
}

export const VerificationStatusValues = Object.values(VerificationStatus)

export interface WhatsAppVerificationMetadata {
  requestIp?: string
  resendCount: number
  userAgent?: string
}

export interface WhatsAppVerificationDocument extends Document {
  _id: string
  phone: string
  restaurantId: string
  customerId: string
  codeHash: string
  status: VerificationStatus
  attempts: number
  maxAttempts: number
  expiresAt: Date
  language: string
  lastSentAt: Date
  metadata: WhatsAppVerificationMetadata
  createdAt: Date
  updatedAt: Date
}

const whatsappVerificationSchema = new Schema<WhatsAppVerificationDocument>(
  {
    phone: {
      type: String,
      required: true,
      trim: true
    },
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
    },
    customerId: {
      type: String,
      required: true,
      ref: 'Customer'
    },
    codeHash: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: VerificationStatusValues,
      default: VerificationStatus.PENDING
    },
    attempts: {
      type: Number,
      required: true,
      default: 0
    },
    maxAttempts: {
      type: Number,
      required: true,
      default: 3
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }
    },
    language: {
      type: String,
      required: true,
      default: 'pt_BR',
      trim: true
    },
    lastSentAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    metadata: {
      requestIp: {
        type: String,
        required: false,
        trim: true
      },
      resendCount: {
        type: Number,
        required: true,
        default: 0
      },
      userAgent: {
        type: String,
        required: false,
        trim: true
      }
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'whatsapp_verifications',
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id as string
        delete (ret as any)._id
        return ret
      }
    }
  }
)

whatsappVerificationSchema.index({ restaurantId: 1 })
whatsappVerificationSchema.index({ phone: 1 })
whatsappVerificationSchema.index({ restaurantId: 1, phone: 1 })
whatsappVerificationSchema.index({ status: 1 })
whatsappVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: WHATSAPP_VERIFICATION_TTL_SECONDS })

export const WhatsAppVerificationModel = model<WhatsAppVerificationDocument>(
  'WhatsAppVerification',
  whatsappVerificationSchema
)
