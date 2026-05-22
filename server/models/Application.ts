import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IApplication extends Document {
  applicationNumber: string
  parentId: mongoose.Types.ObjectId
  child: {
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: string
    race: string[]
    ethnicity: string
    iepStatus: boolean
    iepDocument?: mongoose.Types.ObjectId
    housingStatus: 'stable' | 'homeless' | 'foster_care'
  }
  household: {
    parents: Array<{
      firstName: string
      lastName: string
      relationship: string
      email: string
      phone: string
      income: number
      incomeFrequency: string
      employmentStatus: string
    }>
    householdSize: number
    annualIncome: number
  }
  schoolPreferences: Array<{
    schoolId: mongoose.Types.ObjectId
    priority: number
  }>
  assignedSchoolId?: mongoose.Types.ObjectId
  eligibility: {
    ageEligible: boolean
    fplPercentage: number
    priorityTier: number
    timingRestriction?: Date
    holdReason?: string
  }
  stage: 'intake' | 'enrollment_paperwork' | 'enrolled' | 'site_visit'
  stageHistory: Array<{
    stage: string
    status: string
    timestamp: Date
    notes?: string
  }>
  assignedTeacherId?: mongoose.Types.ObjectId
  documents: Array<{
    documentId: mongoose.Types.ObjectId
    documentType: string
    status: 'pending' | 'verified' | 'action_required' | 'rejected'
    verificationDate?: Date
    verifiedBy?: mongoose.Types.ObjectId
    notes?: string
  }>
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'waitlisted' | 'enrolled' | 'withdrawn'
  submittedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ApplicationSchema = new Schema<IApplication>(
  {
    applicationNumber: {
      type: String,
      required: true,
      unique: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    child: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      gender: { type: String, required: true },
      race: [{ type: String, required: true }],
      ethnicity: { type: String, required: true },
      iepStatus: { type: Boolean, required: true },
      iepDocument: { type: Schema.Types.ObjectId, ref: 'Document' },
      housingStatus: {
        type: String,
        required: true,
        enum: ['stable', 'homeless', 'foster_care']
      }
    },
    household: {
      parents: [{
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        relationship: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        income: { type: Number, required: true },
        incomeFrequency: { type: String, required: true },
        employmentStatus: { type: String, required: true }
      }],
      householdSize: { type: Number, required: true },
      annualIncome: { type: Number, required: true }
    },
    schoolPreferences: [{
      schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
      priority: { type: Number, required: true }
    }],
    assignedSchoolId: {
      type: Schema.Types.ObjectId,
      ref: 'School'
    },
    eligibility: {
      ageEligible: { type: Boolean, required: true },
      fplPercentage: { type: Number, required: true },
      priorityTier: { type: Number, required: true },
      timingRestriction: { type: Date },
      holdReason: { type: String }
    },
    stage: {
      type: String,
      required: true,
      enum: ['intake', 'enrollment_paperwork', 'enrolled', 'site_visit']
    },
    stageHistory: [{
      stage: { type: String, required: true },
      status: { type: String, required: true },
      timestamp: { type: Date, required: true },
      notes: { type: String }
    }],
    assignedTeacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    documents: [{
      documentId: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
      documentType: { type: String, required: true },
      status: {
        type: String,
        required: true,
        enum: ['pending', 'verified', 'action_required', 'rejected']
      },
      verificationDate: { type: Date },
      verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      notes: { type: String }
    }],
    status: {
      type: String,
      required: true,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'waitlisted', 'enrolled', 'withdrawn']
    },
    submittedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

ApplicationSchema.index({ applicationNumber: 1 })
ApplicationSchema.index({ parentId: 1 })
ApplicationSchema.index({ assignedSchoolId: 1 })
ApplicationSchema.index({ stage: 1 })
ApplicationSchema.index({ status: 1 })
ApplicationSchema.index({ createdAt: 1 })

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema)
