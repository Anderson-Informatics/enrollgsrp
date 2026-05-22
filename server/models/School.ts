import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface ISchool extends Document {
  districtId: mongoose.Types.ObjectId
  name: string
  code: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  contactEmail: string
  contactPhone: string
  capacity: number
  currentEnrollment: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const SchoolSchema = new Schema<ISchool>(
  {
    districtId: {
      type: Schema.Types.ObjectId,
      ref: 'District',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true }
    },
    contactEmail: {
      type: String,
      required: true
    },
    contactPhone: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    currentEnrollment: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

SchoolSchema.index({ districtId: 1 })
SchoolSchema.index({ code: 1 })

export default mongoose.models.School || mongoose.model<ISchool>('School', SchoolSchema)
