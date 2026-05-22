import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IAuditLog extends Document {
  userId?: mongoose.Types.ObjectId
  action: 'create' | 'read' | 'update' | 'delete'
  resourceType: string
  resourceId: mongoose.Types.ObjectId
  details: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    action: {
      type: String,
      required: true,
      enum: ['create', 'read', 'update', 'delete']
    },
    resourceType: {
      type: String,
      required: true
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    details: {
      type: Schema.Types.Mixed,
      required: true
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    timestamp: {
      type: Date,
      default: Date.now,
      expires: 5184000 // 60 days in seconds
    }
  }
)

AuditLogSchema.index({ userId: 1 })
AuditLogSchema.index({ resourceType: 1 })
AuditLogSchema.index({ resourceId: 1 })

const AuditLogModel = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema)
export default AuditLogModel as mongoose.Model<IAuditLog>
