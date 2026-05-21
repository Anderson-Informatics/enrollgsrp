import { ObjectId } from 'mongodb'

export interface User {
  _id: ObjectId
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  role: 'super_admin' | 'county_admin' | 'district_admin' | 'school_admin' | 'teacher' | 'parent'
  districtId?: ObjectId
  schoolId?: ObjectId
  permissions: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export interface Role {
  _id: ObjectId
  name: string
  permissions: string[]
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  _id: ObjectId
  code: string
  name: string
  description: string
  category: string
  createdAt: Date
}

export interface District {
  _id: ObjectId
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

export interface School {
  _id: ObjectId
  districtId: ObjectId
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

export interface Application {
  _id: ObjectId
  applicationNumber: string
  parentId: ObjectId
  child: {
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: string
    race: string[]
    ethnicity: string
    iepStatus: boolean
    iepDocument?: ObjectId
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
    schoolId: ObjectId
    priority: number
  }>
  assignedSchoolId?: ObjectId
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
  assignedTeacherId?: ObjectId
  documents: Array<{
    documentId: ObjectId
    documentType: string
    status: 'pending' | 'verified' | 'action_required' | 'rejected'
    verificationDate?: Date
    verifiedBy?: ObjectId
    notes?: string
  }>
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'waitlisted' | 'enrolled' | 'withdrawn'
  submittedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  _id: ObjectId
  applicationId: ObjectId
  uploadedBy: ObjectId
  fileName: string
  fileType: string
  mimeType: string
  fileSize: number
  storagePath: string
  uploadedAt: Date
  expiresAt?: Date
}

export interface Communication {
  _id: ObjectId
  applicationId: ObjectId
  from: ObjectId
  to: ObjectId
  type: 'email' | 'sms' | 'phone_log' | 'in_app'
  subject?: string
  message: string
  status: 'sent' | 'delivered' | 'failed' | 'pending'
  sentAt?: Date
  createdAt: Date
}

export interface SiteVisit {
  _id: ObjectId
  applicationId: ObjectId
  teacherId: ObjectId
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

export interface Classroom {
  _id: ObjectId
  schoolId: ObjectId
  name: string
  teacherId: ObjectId
  capacity: number
  currentStudents: number
  gradeLevel: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuditLog {
  _id: ObjectId
  userId?: ObjectId
  action: 'create' | 'read' | 'update' | 'delete'
  resourceType: string
  resourceId: ObjectId
  details: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}
