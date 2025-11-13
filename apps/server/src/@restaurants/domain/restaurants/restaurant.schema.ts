import { type Document, Schema, model } from 'mongoose'

import { OperationTypeValues } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import { PaymentMethodValues } from '@restaurants/domain/restaurants/enums/payment-methods.enum'
import type {
  RestaurantAddress,
  RestaurantContactInfo,
  RestaurantSettings,
  RestaurantStyle
} from '@restaurants/domain/restaurants/restaurant.entity'

export interface RestaurantDocument extends Document {
  _id: string
  name: string
  description: string
  slug: string
  logoPath?: string
  ownerId: string
  isActive: boolean
  address?: RestaurantAddress
  contactInfo?: RestaurantContactInfo
  settings?: RestaurantSettings
  style?: RestaurantStyle
  createdAt: Date
  updatedAt: Date
}

const restaurantSchema = new Schema<RestaurantDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    logoPath: {
      type: String,
      required: false
    },
    ownerId: {
      type: String,
      required: true,
      ref: 'User'
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    address: {
      street: {
        type: String,
        required: false
      },
      number: {
        type: String,
        required: false
      },
      complement: {
        type: String,
        required: false
      },
      neighborhood: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      state: {
        type: String,
        required: false
      },
      zipCode: {
        type: String,
        required: false
      },
      country: {
        type: String,
        required: false,
        default: 'Brasil'
      }
    },
    contactInfo: {
      phone: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: false
      },
      website: {
        type: String,
        required: false
      },
      socialMedia: {
        instagram: {
          type: String,
          required: false
        },
        facebook: {
          type: String,
          required: false
        },
        whatsapp: {
          type: String,
          required: false
        }
      }
    },
    settings: {
      operationTypes: {
        type: [String],
        required: false,
        enum: OperationTypeValues
      },
      paymentMethods: {
        type: [String],
        required: false,
        enum: PaymentMethodValues
      },
      deliveryFee: {
        type: Number,
        required: false
      },
      businessHours: {
        type: Object,
        required: false
      },
      templates: {
        type: Object,
        required: false
      },
      acceptsScheduling: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    style: {
      primaryColor: {
        type: String,
        required: false
      },
      secondaryColor: {
        type: String,
        required: false
      }
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

restaurantSchema.index({ ownerId: 1 })
restaurantSchema.index({ isActive: 1 })

export const RestaurantModel = model<RestaurantDocument>('Restaurant', restaurantSchema)
