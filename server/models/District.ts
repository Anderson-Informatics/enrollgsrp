import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IDistrict extends Document {
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
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const DistrictSchema = new Schema<IDistrict>(
  {
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
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

DistrictSchema.index({ code: 1 })

export default mongoose.models.District || mongoose.model<IDistrict>('District', DistrictSchema)
