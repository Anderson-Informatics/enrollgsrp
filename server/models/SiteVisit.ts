import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface ISiteVisit extends Document {
  applicationId: mongoose.Types.ObjectId
  teacherId: mongoose.Types.ObjectId
  scheduledDate: Date
  scheduledTime: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  asqResults?: {
    communication: number
    grossMotor: number
    fineMotor: number
    problemSolving: number
    personalSocial: number
    overallScore: number
    notes?: string
  }
  createdAt: Date
  updatedAt: Date
}

const SiteVisitSchema = new Schema<ISiteVisit>(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    scheduledDate: {
      type: Date,
      required: true
    },
    scheduledTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled']
    },
    asqResults: {
      communication: { type: Number },
      grossMotor: { type: Number },
      fineMotor: { type: Number },
      problemSolving: { type: Number },
      personalSocial: { type: Number },
      overallScore: { type: Number },
      notes: { type: String }
    }
  },
  {
    timestamps: true
  }
)

SiteVisitSchema.index({ applicationId: 1 })
SiteVisitSchema.index({ teacherId: 1 })
SiteVisitSchema.index({ scheduledDate: 1 })

export default mongoose.models.SiteVisit || mongoose.model<ISiteVisit>('SiteVisit', SiteVisitSchema)
