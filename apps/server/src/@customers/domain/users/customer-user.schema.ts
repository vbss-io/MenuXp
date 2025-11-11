import { type Document, Schema, model } from 'mongoose'

import type { Address } from '@api/domain/types/address.type'

export interface CustomerUserDocument extends Document {
  _id: string
  phone: string
  restaurantId: string
  name?: string
  address?: Address
  preferredLanguage: string
  createdAt: Date
  updatedAt: Date
}

const customerUserSchema = new Schema<CustomerUserDocument>(
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
    name: {
      type: String,
      required: false,
      trim: true
    },
    address: {
      street: {
        type: String,
        required: false,
        trim: true
      },
      number: {
        type: String,
        required: false,
        trim: true
      },
      complement: {
        type: String,
        required: false,
        trim: true
      },
      neighborhood: {
        type: String,
        required: false,
        trim: true
      },
      city: {
        type: String,
        required: false,
        trim: true
      },
      state: {
        type: String,
        required: false,
        trim: true
      },
      zipCode: {
        type: String,
        required: false,
        trim: true
      },
      country: {
        type: String,
        required: false,
        trim: true
      }
    },
    preferredLanguage: {
      type: String,
      required: false,
      default: 'pt_BR',
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
    collection: 'customer_users',
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

customerUserSchema.index({ restaurantId: 1 })
customerUserSchema.index({ phone: 1 })
customerUserSchema.index({ restaurantId: 1, phone: 1 }, { unique: true })

export const CustomerUserModel = model<CustomerUserDocument>('CustomerUser', customerUserSchema)
