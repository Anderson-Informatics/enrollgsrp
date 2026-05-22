import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface ICommunication extends Document {
  applicationId: mongoose.Types.ObjectId
  from: mongoose.Types.ObjectId
  to: mongoose.Types.ObjectId
  type: 'email' | 'sms' | 'phone_log' | 'in_app'
  subject?: string
  message: string
  status: 'sent' | 'delivered' | 'failed' | 'pending'
  sentAt?: Date
  createdAt: Date
}

const CommunicationSchema = new Schema<ICommunication>(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['email', 'sms', 'phone_log', 'in_app']
    },
    subject: {
      type: String
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['sent', 'delivered', 'failed', 'pending']
    },
    sentAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

CommunicationSchema.index({ applicationId: 1 })
CommunicationSchema.index({ from: 1 })
CommunicationSchema.index({ to: 1 })

export default mongoose.models.Communication || mongoose.model<ICommunication>('Communication', CommunicationSchema)
