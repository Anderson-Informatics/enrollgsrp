import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IClassroom extends Document {
  schoolId: mongoose.Types.ObjectId
  name: string
  teacherId: mongoose.Types.ObjectId
  capacity: number
  currentStudents: number
  gradeLevel: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ClassroomSchema = new Schema<IClassroom>(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'School',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    currentStudents: {
      type: Number,
      default: 0
    },
    gradeLevel: {
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

ClassroomSchema.index({ schoolId: 1 })

export default mongoose.models.Classroom || mongoose.model<IClassroom>('Classroom', ClassroomSchema)
