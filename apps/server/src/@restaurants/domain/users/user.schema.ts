import { type Document, model, Schema } from 'mongoose'

import { type UserRole, UserRoleValues } from '@restaurants/domain/users/enums/user-role.enum'
import { type UserStatus, UserStatusValues } from '@restaurants/domain/users/enums/user-status.enum'
import { type UserType, UserTypeValues } from '@restaurants/domain/users/enums/user-type.enum'

export interface UserDocument extends Document {
  _id: string
  name: string
  email: string
  passwordHash: string
  confirmedEmail: boolean
  userType: UserType
  role: UserRole
  status: UserStatus
  restaurantId?: string
  avatarPath?: string
  currentSubscriptionId?: string
  externalCustomerId?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    confirmedEmail: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      required: true,
      enum: UserTypeValues
    },
    role: {
      type: String,
      required: true,
      enum: UserRoleValues
    },
    status: {
      type: String,
      required: true,
      enum: UserStatusValues
    },
    restaurantId: {
      type: String,
      required: false
    },
    avatarPath: {
      type: String
    },
    currentSubscriptionId: {
      type: String,
      ref: 'Subscription'
    },
    externalCustomerId: {
      type: String
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
        delete (ret as any).passwordHash
        delete (ret as any).confirmationCode
        return ret
      }
    }
  }
)

userSchema.virtual('profile', {
  ref: 'UserProfile',
  localField: '_id',
  foreignField: 'userId',
  justOne: true
})

export const UserModel = model<UserDocument>('User', userSchema)

userSchema.index({ email: 1 }, { unique: true, name: 'idx_user_email_unique' })
userSchema.index({ userType: 1 }, { name: 'idx_user_type' })
userSchema.index({ status: 1 }, { name: 'idx_user_status' })
userSchema.index({ role: 1 }, { name: 'idx_user_role' })
userSchema.index({ confirmedEmail: 1 }, { name: 'idx_user_confirmed_email' })
userSchema.index({ createdAt: -1 }, { name: 'idx_user_created_at_desc' })
userSchema.index({ updatedAt: -1 }, { name: 'idx_user_updated_at_desc' })
userSchema.index({ status: 1, role: 1 }, { name: 'idx_user_status_role' })
userSchema.index({ email: 1, status: 1 }, { name: 'idx_user_email_status' })
userSchema.index({ userType: 1, role: 1 }, { name: 'idx_user_type_role' })
