import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  role: 'super_admin' | 'county_admin' | 'district_admin' | 'school_admin' | 'teacher' | 'parent'
  districtId?: mongoose.Types.ObjectId
  schoolId?: mongoose.Types.ObjectId
  permissions: string[]
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: ['super_admin', 'county_admin', 'district_admin', 'school_admin', 'teacher', 'parent']
    },
    districtId: {
      type: Schema.Types.ObjectId,
      ref: 'District'
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'School'
    },
    permissions: [{
      type: String
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    lastLoginAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

UserSchema.index({ role: 1 })
UserSchema.index({ districtId: 1 })
UserSchema.index({ schoolId: 1 })

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export default UserModel as mongoose.Model<IUser>
