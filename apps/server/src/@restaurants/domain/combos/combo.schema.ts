import { type Document, Schema, model } from 'mongoose'

import type { ComboItem, ComboOptional } from '@restaurants/domain/combos/combo.entity'

export interface ComboDocument extends Document {
  _id: string
  name: string
  isActive: boolean
  description?: string
  categoryId: string
  price: number
  stock: number
  discount: number
  medias: string[]
  items: ComboItem[]
  optionals: ComboOptional[]
  useCategoryOptionals: boolean
  restaurantId: string
  createdAt: Date
  updatedAt: Date
}

const comboItemSchema = new Schema(
  {
    menuItemId: {
      type: String,
      required: true,
      ref: 'MenuItem'
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
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
    }
  },
  { _id: false }
)

const comboOptionalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    maxQuantity: {
      type: Number,
      required: false,
      min: 0
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
)

const comboSchema = new Schema<ComboDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    categoryId: {
      type: String,
      required: true,
      ref: 'Category'
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    medias: {
      type: [String],
      required: true,
      default: []
    },
    items: {
      type: [comboItemSchema],
      required: true,
      default: []
    },
    optionals: {
      type: [comboOptionalSchema],
      required: true,
      default: []
    },
    useCategoryOptionals: {
      type: Boolean,
      required: true,
      default: false
    },
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
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
    collection: 'combos',
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

comboSchema.index({ restaurantId: 1 })
comboSchema.index({ categoryId: 1 })
comboSchema.index({ isActive: 1 })

export const ComboModel = model<ComboDocument>('Combo', comboSchema)
