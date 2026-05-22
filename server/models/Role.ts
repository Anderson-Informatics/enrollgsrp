import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IRole extends Document {
  name: string
  permissions: string[]
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    permissions: [{
      type: String
    }],
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

RoleSchema.index({ name: 1 })

export default mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema)
