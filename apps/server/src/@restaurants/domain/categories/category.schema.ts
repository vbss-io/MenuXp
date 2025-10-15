import { type Document, Schema, model } from 'mongoose'

import { type CategoryOptional } from '@restaurants/domain/categories/category.entity'

export interface CategoryDocument extends Document {
  _id: string
  name: string
  isActive: boolean
  description?: string
  restaurantId?: string
  mainCategoryId?: string
  icon?: string
  optionals: Array<CategoryOptional>
  createdAt: Date
  updatedAt: Date
}

const categorySchema = new Schema<CategoryDocument>(
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
    restaurantId: {
      type: String,
      required: false,
      ref: 'Restaurant'
    },
    mainCategoryId: {
      type: String,
      required: false,
      ref: 'Category'
    },
    icon: {
      type: String,
      required: false,
      trim: true
    },
    optionals: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true
          },
          maxQuantity: {
            type: Number,
            required: false,
            min: 1
          },
          price: {
            type: Number,
            required: true,
            min: 0
          }
        }
      ],
      required: true,
      default: []
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

categorySchema.index({ restaurantId: 1 })
categorySchema.index({ mainCategoryId: 1 })
categorySchema.index({ isActive: 1 })

export const CategoryModel = model<CategoryDocument>('Category', categorySchema)
