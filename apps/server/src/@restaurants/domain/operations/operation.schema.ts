import { type Document, Schema, model } from 'mongoose'

import { OperationStatus, OperationStatusValues } from '@restaurants/domain/operations/enums/operation-status.enum'

export interface OperationDocument extends Document {
  _id: string
  restaurantId: string
  status: string
  createdAt: Date
  updatedAt: Date
}

const operationSchema = new Schema<OperationDocument>(
  {
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant'
    },
    status: {
      type: String,
      required: true,
      enum: OperationStatusValues,
      default: OperationStatus.RUNNING
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

operationSchema.index({ restaurantId: 1 })
operationSchema.index({ status: 1 })
operationSchema.index({ createdAt: 1 })

export const OperationModel = model<OperationDocument>('Operation', operationSchema)
