import { type Document, Schema, model } from 'mongoose'

import { OrderStatusValues } from '@restaurants/domain/orders/enums/order-status.enum'
import { OperationTypeValues } from '@restaurants/domain/restaurants/enums/operation-type.enum'

export interface OrderStatusHistoryDocument extends Document {
  _id: string
  orderId: string
  restaurantId: string
  status: string
  changedAt: Date
  operationType?: string
}

const orderStatusHistorySchema = new Schema<OrderStatusHistoryDocument>(
  {
    orderId: {
      type: String,
      required: true,
      ref: 'Order'
    },
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
    },
    status: {
      type: String,
      required: true,
      enum: OrderStatusValues
    },
    changedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    operationType: {
      type: String,
      required: false,
      enum: OperationTypeValues
    }
  },
  {
    versionKey: false,
    collection: 'order_status_histories',
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

orderStatusHistorySchema.index({ orderId: 1, status: 1 })
orderStatusHistorySchema.index({ restaurantId: 1, changedAt: 1 })

export const OrderStatusHistoryModel = model<OrderStatusHistoryDocument>('OrderStatusHistory', orderStatusHistorySchema)
