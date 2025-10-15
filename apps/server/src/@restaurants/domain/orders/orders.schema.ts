import { type Document, Schema, model } from 'mongoose'

import { OrderStatusValues } from '@restaurants/domain/orders/enums/order-status.enum'
import type { OrderCustomer, OrderItem } from '@restaurants/domain/orders/orders.entity'
import { OperationTypeValues } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import { PaymentMethodValues } from '@restaurants/domain/restaurants/enums/payment-methods.enum'

export interface OrderDocument extends Document {
  _id: string
  restaurantId: string
  operationId?: string
  clientId: string
  status: string
  subtotal: number
  deliveryFee?: number
  total: number
  customer: OrderCustomer
  orderType: string
  paymentMethod: string
  items: OrderItem[]
  code: string
  isScheduled: boolean
  scheduledFor?: Date
  cancelReason?: string
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<OrderDocument>(
  {
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
    },
    operationId: {
      type: String,
      required: false,
      ref: 'Operation'
    },
    clientId: {
      type: String,
      required: true,
      ref: 'Client'
    },
    status: {
      type: String,
      required: true,
      enum: OrderStatusValues
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    deliveryFee: {
      type: Number,
      required: false,
      min: 0,
      default: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    customer: {
      name: {
        type: String,
        required: true,
        trim: true
      },
      phone: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        street: {
          type: String,
          required: true,
          trim: true
        },
        number: {
          type: String,
          required: true,
          trim: true
        },
        complement: {
          type: String,
          required: false,
          trim: true
        },
        neighborhood: {
          type: String,
          required: true,
          trim: true
        },
        city: {
          type: String,
          required: true,
          trim: true
        },
        state: {
          type: String,
          required: true,
          trim: true
        }
      }
    },
    orderType: {
      type: String,
      required: true,
      enum: OperationTypeValues
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: PaymentMethodValues
    },
    items: [
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
        itemType: {
          type: String,
          required: true,
          enum: ['menu-item', 'combo'],
          default: 'menu-item'
        }
      }
    ],
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    isScheduled: {
      type: Boolean,
      required: true,
      default: false
    },
    scheduledFor: {
      type: Date,
      required: false
    },
    cancelReason: {
      type: String,
      required: false,
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

orderSchema.index({ restaurantId: 1 })
orderSchema.index({ operationId: 1 })
orderSchema.index({ clientId: 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ createdAt: 1 })
orderSchema.index({ isScheduled: 1 })
orderSchema.index({ scheduledFor: 1 })

export const OrderModel = model<OrderDocument>('Order', orderSchema)
