import { type Document, Schema, model } from 'mongoose'

import type { MenuItemOptional } from '@restaurants/domain/menu-items/menu-item.entity'

export interface MenuItemDocument extends Document {
  _id: string
  name: string
  isActive: boolean
  description?: string
  categoryId: string
  price: number
  stock: number
  discount: number
  medias: string[]
  optionals: MenuItemOptional[]
  useCategoryOptionals: boolean
  restaurantId: string
  createdAt: Date
  updatedAt: Date
}

const menuItemOptionalSchema = new Schema(
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
  {
    _id: false,
    versionKey: false
  }
)

const menuItemSchema = new Schema<MenuItemDocument>(
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
    optionals: {
      type: [menuItemOptionalSchema],
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'menu_items',
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

menuItemSchema.index({ restaurantId: 1 })
menuItemSchema.index({ categoryId: 1 })
menuItemSchema.index({ isActive: 1 })
menuItemSchema.index({ restaurantId: 1, isActive: 1 })
menuItemSchema.index({ categoryId: 1, isActive: 1 })

export const MenuItemModel = model<MenuItemDocument>('MenuItem', menuItemSchema)
