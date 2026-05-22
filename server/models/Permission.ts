import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IPermission extends Document {
  code: string
  name: string
  description: string
  category: string
  createdAt: Date
}

const PermissionSchema = new Schema<IPermission>(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

PermissionSchema.index({ category: 1 })

const PermissionModel = mongoose.models.Permission || mongoose.model<IPermission>('Permission', PermissionSchema)
export default PermissionModel as mongoose.Model<IPermission>
