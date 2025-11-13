import { type Document, Schema, model } from 'mongoose'

import {
  type MenuSectionType,
  MenuSectionTypeValues
} from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import {
  MenuLayoutStatus,
  MenuLayoutStatusValues
} from '@restaurants/domain/menu-layouts/enums/menu-layout-status.enum'

export interface MenuSectionDocument {
  id: string
  type: MenuSectionType
  config: Record<string, unknown>
}

export interface MenuLayoutDocument extends Document {
  _id: string
  name: string
  description?: string
  restaurantId: string
  status: MenuLayoutStatus
  sections: MenuSectionDocument[]
  layout: string
  createdAt: Date
  updatedAt: Date
}

const menuSectionSchema = new Schema<MenuSectionDocument>(
  {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: MenuSectionTypeValues
    },
    config: {
      type: Schema.Types.Mixed,
      required: true,
      default: {}
    }
  },
  {
    _id: false,
    versionKey: false
  }
)

const menuLayoutSchema = new Schema<MenuLayoutDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
    },
    status: {
      type: String,
      required: true,
      enum: MenuLayoutStatusValues,
      default: MenuLayoutStatus.DRAFT
    },
    sections: {
      type: [menuSectionSchema],
      required: true,
      default: []
    },
    layout: {
      type: String,
      required: true,
      default: 'default',
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
    collection: 'menu_layouts',
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

menuLayoutSchema.index({ restaurantId: 1 })
menuLayoutSchema.index({ restaurantId: 1, status: 1 })
menuLayoutSchema.index({ status: 1 })
menuLayoutSchema.index({ createdAt: -1 })

export const MenuLayoutModel = model<MenuLayoutDocument>('MenuLayout', menuLayoutSchema)
