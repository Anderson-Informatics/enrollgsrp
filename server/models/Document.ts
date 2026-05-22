import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IDocument extends Document {
  applicationId: mongoose.Types.ObjectId
  uploadedBy: mongoose.Types.ObjectId
  fileName: string
  fileType: string
  mimeType: string
  fileSize: number
  storagePath: string
  uploadedAt: Date
  expiresAt?: Date
}

const DocumentSchema = new Schema<IDocument>(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    storagePath: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date
    }
  }
)

DocumentSchema.index({ applicationId: 1 })
DocumentSchema.index({ uploadedBy: 1 })

export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema)
