# Database Schema Documentation

## Collections Overview

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  passwordHash: String,
  firstName: String,
  lastName: String,
  role: String, // 'super_admin', 'county_admin', 'district_admin', 'school_admin', 'teacher', 'parent'
  districtId: ObjectId (ref: Districts, optional),
  schoolId: ObjectId (ref: Schools, optional),
  permissions: [String], // Array of permission codes
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
}
```

### Roles Collection (for granular permissions)
```javascript
{
  _id: ObjectId,
  name: String, // 'County Admin', 'District Admin', 'School Admin', 'Teacher'
  permissions: [String], // Array of permission codes
  isDefault: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Permissions Collection
```javascript
{
  _id: ObjectId,
  code: String (unique), // 'users.create', 'applications.view', etc.
  name: String,
  description: String,
  category: String, // 'users', 'applications', 'reports', etc.
  createdAt: Date
}
```

### Districts Collection
```javascript
{
  _id: ObjectId,
  name: String,
  code: String (unique),
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  contactEmail: String,
  contactPhone: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Schools Collection
```javascript
{
  _id: ObjectId,
  districtId: ObjectId (ref: Districts, indexed),
  name: String,
  code: String (unique),
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  contactEmail: String,
  contactPhone: String,
  capacity: Number, // Total capacity
  currentEnrollment: Number,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Applications Collection
```javascript
{
  _id: ObjectId,
  applicationNumber: String (unique, indexed),
  parentId: ObjectId (ref: Users, indexed),
  child: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    race: [String],
    ethnicity: String,
    iepStatus: Boolean,
    iepDocument: ObjectId (ref: Documents, optional),
    housingStatus: String, // 'stable', 'homeless', 'foster_care'
  },
  household: {
    parents: [{
      firstName: String,
      lastName: String,
      relationship: String,
      email: String,
      phone: String,
      income: Number,
      incomeFrequency: String,
      employmentStatus: String
    }],
    householdSize: Number,
    annualIncome: Number
  },
  schoolPreferences: [{
    schoolId: ObjectId (ref: Schools),
    priority: Number // 1, 2, 3
  }],
  assignedSchoolId: ObjectId (ref: Schools, optional),
  eligibility: {
    ageEligible: Boolean,
    fplPercentage: Number,
    priorityTier: Number, // 1, 2, 3
    timingRestriction: Date, // Date when enrollment can begin
    holdReason: String
  },
  stage: String, // 'intake', 'enrollment_paperwork', 'enrolled', 'site_visit'
  stageHistory: [{
    stage: String,
    status: String,
    timestamp: Date,
    notes: String
  }],
  assignedTeacherId: ObjectId (ref: Users, optional),
  documents: [{
    documentId: ObjectId (ref: Documents),
    documentType: String,
    status: String, // 'pending', 'verified', 'action_required', 'rejected'
    verificationDate: Date,
    verifiedBy: ObjectId (ref: Users),
    notes: String
  }],
  status: String, // 'draft', 'submitted', 'under_review', 'approved', 'waitlisted', 'enrolled', 'withdrawn'
  submittedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Documents Collection
```javascript
{
  _id: ObjectId,
  applicationId: ObjectId (ref: Applications, indexed),
  uploadedBy: ObjectId (ref: Users),
  fileName: String,
  fileType: String, // 'birth_certificate', 'income_verification', 'iep', 'proof_of_residency', etc.
  mimeType: String,
  fileSize: Number,
  storagePath: String, // Path in storage service
  uploadedAt: Date,
  expiresAt: Date
}
```

### Communications Collection
```javascript
{
  _id: ObjectId,
  applicationId: ObjectId (ref: Applications, indexed),
  from: ObjectId (ref: Users),
  to: ObjectId (ref: Users),
  type: String, // 'email', 'sms', 'phone_log', 'in_app'
  subject: String (optional),
  message: String,
  status: String, // 'sent', 'delivered', 'failed', 'pending'
  sentAt: Date,
  createdAt: Date
}
```

### SiteVisits Collection
```javascript
{
  _id: ObjectId,
  applicationId: ObjectId (ref: Applications, indexed),
  teacherId: ObjectId (ref: Users),
  scheduledDate: Date,
  scheduledTime: String,
  status: String, // 'scheduled', 'completed', 'cancelled', 'rescheduled'
  asqResults: {
    communication: Number,
    grossMotor: Number,
    fineMotor: Number,
    problemSolving: Number,
    personalSocial: Number,
    overallScore: Number,
    notes: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Classrooms Collection
```javascript
{
  _id: ObjectId,
  schoolId: ObjectId (ref: Schools, indexed),
  name: String,
  teacherId: ObjectId (ref: Users),
  capacity: Number,
  currentStudents: Number,
  gradeLevel: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### AuditLogs Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, optional for system actions),
  action: String, // 'create', 'read', 'update', 'delete'
  resourceType: String, // 'application', 'user', 'document', etc.
  resourceId: ObjectId,
  details: Object,
  ipAddress: String,
  userAgent: String,
  timestamp: Date
}
```

## Indexes

### Users
- `email` (unique)
- `role`
- `districtId`
- `schoolId`

### Applications
- `applicationNumber` (unique)
- `parentId`
- `assignedSchoolId`
- `stage`
- `status`
- `createdAt`

### Documents
- `applicationId`
- `uploadedBy`

### Communications
- `applicationId`
- `from`
- `to`

### SiteVisits
- `applicationId`
- `teacherId`
- `scheduledDate`

### AuditLogs
- `userId`
- `resourceType`
- `resourceId`
- `timestamp` (TTL for cleanup)

## Relationships

- Users → Districts (many-to-one via districtId)
- Users → Schools (many-to-one via schoolId)
- Users → Roles (many-to-many via permissions array)
- Schools → Districts (many-to-one via districtId)
- Applications → Users (many-to-one via parentId)
- Applications → Schools (many-to-one via assignedSchoolId)
- Applications → Documents (one-to-many via documents array)
- Applications → Communications (one-to-many)
- Applications → SiteVisits (one-to-many)
- Classrooms → Schools (many-to-one)
- Classrooms → Users (many-to-one via teacherId)
