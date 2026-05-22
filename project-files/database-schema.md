# Database Schema Documentation

## Technology Stack

This project uses **Mongoose** as the ODM (Object Data Modeling) library for MongoDB. Mongoose provides:
- Schema validation and type safety
- Built-in middleware for pre/post hooks
- Automatic timestamps
- Query builder API
- Population for referenced documents
- Better TypeScript support

## Mongoose Models

All database collections are defined as Mongoose models in `server/models/`:
- `User.ts` - User accounts and authentication
- `Role.ts` - Role definitions with permission sets
- `Permission.ts` - Individual permission codes
- `District.ts` - School district information
- `School.ts` - School information within districts
- `Application.ts` - Student enrollment applications
- `Document.ts` - Uploaded documents for applications
- `Communication.ts` - Communication logs
- `SiteVisit.ts` - Site visit scheduling and ASQ results
- `Classroom.ts` - Classroom assignments
- `AuditLog.ts` - Audit trail for compliance

## Collection Schemas

### Users Collection
```javascript
{
  email: String (unique, indexed, lowercase, trim)
  passwordHash: String (required)
  firstName: String (required, trim)
  lastName: String (required, trim)
  role: Enum ['super_admin', 'county_admin', 'district_admin', 'school_admin', 'teacher', 'parent']
  districtId: ObjectId (ref: Districts, optional)
  schoolId: ObjectId (ref: Schools, optional)
  permissions: [String]
  isActive: Boolean (default: true)
  lastLoginAt: Date (optional)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### Roles Collection
```javascript
{
  name: String (unique, required)
  permissions: [String]
  isDefault: Boolean (default: false)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### Permissions Collection
```javascript
{
  code: String (unique, required)
  name: String (required)
  description: String (required)
  category: String (required)
  createdAt: Date (automatic)
}
```

### Districts Collection
```javascript
{
  name: String (required)
  code: String (unique, required)
  address: {
    street: String (required)
    city: String (required)
    state: String (required)
    zip: String (required)
  }
  contactEmail: String (required)
  contactPhone: String (required)
  isActive: Boolean (default: true)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### Schools Collection
```javascript
{
  districtId: ObjectId (ref: Districts, required, indexed)
  name: String (required)
  code: String (unique, required)
  address: {
    street: String (required)
    city: String (required)
    state: String (required)
    zip: String (required)
  }
  contactEmail: String (required)
  contactPhone: String (required)
  capacity: Number (required)
  currentEnrollment: Number (default: 0)
  isActive: Boolean (default: true)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### Applications Collection
```javascript
{
  applicationNumber: String (unique, indexed, required)
  parentId: ObjectId (ref: Users, indexed, required)
  child: {
    firstName: String (required)
    lastName: String (required)
    dateOfBirth: Date (required)
    gender: String (required)
    race: [String] (required)
    ethnicity: String (required)
    iepStatus: Boolean (required)
    iepDocument: ObjectId (ref: Documents, optional)
    housingStatus: Enum ['stable', 'homeless', 'foster_care'] (required)
  }
  household: {
    parents: [{
      firstName: String (required)
      lastName: String (required)
      relationship: String (required)
      email: String (required)
      phone: String (required)
      income: Number (required)
      incomeFrequency: String (required)
      employmentStatus: String (required)
    }]
    householdSize: Number (required)
    annualIncome: Number (required)
  }
  schoolPreferences: [{
    schoolId: ObjectId (ref: Schools, required)
    priority: Number (required)
  }]
  assignedSchoolId: ObjectId (ref: Schools, optional)
  eligibility: {
    ageEligible: Boolean (required)
    fplPercentage: Number (required)
    priorityTier: Number (required)
    timingRestriction: Date (optional)
    holdReason: String (optional)
  }
  stage: Enum ['intake', 'enrollment_paperwork', 'enrolled', 'site_visit'] (required)
  stageHistory: [{
    stage: String (required)
    status: String (required)
    timestamp: Date (required)
    notes: String (optional)
  }]
  assignedTeacherId: ObjectId (ref: Users, optional)
  documents: [{
    documentId: ObjectId (ref: Documents, required)
    documentType: String (required)
    status: Enum ['pending', 'verified', 'action_required', 'rejected'] (required)
    verificationDate: Date (optional)
    verifiedBy: ObjectId (ref: Users, optional)
    notes: String (optional)
  }]
  status: Enum ['draft', 'submitted', 'under_review', 'approved', 'waitlisted', 'enrolled', 'withdrawn'] (required)
  submittedAt: Date (optional)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### Documents Collection
```javascript
{
  applicationId: ObjectId (ref: Applications, indexed, required)
  uploadedBy: ObjectId (ref: Users, required)
  fileName: String (required)
  fileType: String (required)
  mimeType: String (required)
  fileSize: Number (required)
  storagePath: String (required)
  uploadedAt: Date (default: Date.now)
  expiresAt: Date (optional)
}
```

### Communications Collection
```javascript
{
  applicationId: ObjectId (ref: Applications, indexed, required)
  from: ObjectId (ref: Users, required)
  to: ObjectId (ref: Users, required)
  type: Enum ['email', 'sms', 'phone_log', 'in_app'] (required)
  subject: String (optional)
  message: String (required)
  status: Enum ['sent', 'delivered', 'failed', 'pending'] (required)
  sentAt: Date (optional)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### SiteVisits Collection
```javascript
{
  applicationId: ObjectId (ref: Applications, indexed, required)
  teacherId: ObjectId (ref: Users, indexed, required)
  scheduledDate: Date (indexed, required)
  scheduledTime: String (required)
  status: Enum ['scheduled', 'completed', 'cancelled', 'rescheduled'] (required)
  asqResults: {
    communication: Number
    grossMotor: Number
    fineMotor: Number
    problemSolving: Number
    personalSocial: Number
    overallScore: Number
    notes: String (optional)
  }
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### Classrooms Collection
```javascript
{
  schoolId: ObjectId (ref: Schools, indexed, required)
  name: String (required)
  teacherId: ObjectId (ref: Users, required)
  capacity: Number (required)
  currentStudents: Number (default: 0)
  gradeLevel: String (required)
  isActive: Boolean (default: true)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

### AuditLogs Collection
```javascript
{
  userId: ObjectId (ref: Users, optional)
  action: Enum ['create', 'read', 'update', 'delete'] (required)
  resourceType: String (required)
  resourceId: ObjectId (required)
  details: Mixed (required)
  ipAddress: String (optional)
  userAgent: String (optional)
  timestamp: Date (default: Date.now, expires: 60 days)
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
- `timestamp` (TTL for 60-day cleanup)

## Relationships

Mongoose `populate()` is used for relationships:
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

## Mongoose Middleware

Pre/post hooks will be implemented for:
- **Pre-save**: Audit logging, data validation
- **Pre-delete**: Cascade deletion checks
- **Post-save**: Trigger notifications, update related documents
- **Post-find**: Permission filtering

## Usage Examples

### Creating a User
```typescript
import User from '~/server/models/User'

const user = await User.create({
  email: 'user@example.com',
  passwordHash: 'hashed_password',
  firstName: 'John',
  lastName: 'Doe',
  role: 'district_admin',
  permissions: ['applications.view', 'applications.create']
})
```

### Querying with Population
```typescript
const application = await Application.findById(appId)
  .populate('parentId')
  .populate('assignedSchoolId')
  .populate('documents.documentId')
```

### Using Middleware
```typescript
ApplicationSchema.pre('save', function() {
  // Audit log entry before save
  // Validation checks
  // Data transformation
})
```
