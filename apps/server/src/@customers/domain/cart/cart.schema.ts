import { type Document, Schema, model } from 'mongoose'

export interface CartDocument extends Document {
  _id: string
  clientId?: string
  sessionId?: string
  restaurantId: string
  items: {
    itemId: string
    name: string
    price: number
    quantity: number
    itemType: 'menu-item' | 'combo'
    optionals?: {
      name: string
      price: number
      quantity: number
    }[]
    note?: string
  }[]
  total: number
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

const cartItemOptionalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    _id: false,
    versionKey: false
  }
)

const cartItemSchema = new Schema(
  {
    itemId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    optionals: {
      type: [cartItemOptionalSchema],
      required: false,
      default: []
    },
    itemType: {
      type: String,
      required: true,
      enum: ['menu-item', 'combo'],
      default: 'menu-item'
    },
    note: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500
    }
  },
  {
    _id: false,
    versionKey: false
  }
)

const cartSchema = new Schema<CartDocument>(
  {
    clientId: {
      type: String,
      required: false,
      ref: 'CustomerUser'
    },
    sessionId: {
      type: String,
      required: false
    },
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
    },
    items: {
      type: [cartItemSchema],
      required: true,
      default: []
    },
    total: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    itemCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0
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

cartSchema.index({ clientId: 1 })
cartSchema.index({ restaurantId: 1 })
cartSchema.index({ createdAt: -1 })
cartSchema.index({ clientId: 1, restaurantId: 1 })
cartSchema.index({ sessionId: 1, restaurantId: 1 })

export const CartModel = model<CartDocument>('Cart', cartSchema)
