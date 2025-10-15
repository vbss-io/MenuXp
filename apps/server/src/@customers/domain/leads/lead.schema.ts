import { type Document, Schema, model } from 'mongoose'

export interface LeadDocument extends Document {
  _id: string
  name: string
  email: string
  whatsapp?: string
  scenario?: string
  createdAt: Date
  updatedAt: Date
}

const leadSchema = new Schema<LeadDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 255
    },
    whatsapp: {
      type: String,
      required: false,
      trim: true
    },
    scenario: {
      type: String,
      required: false,
      trim: true,
      maxlength: 1000
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

leadSchema.index({ createdAt: -1 })

export const LeadModel = model<LeadDocument>('Lead', leadSchema)
