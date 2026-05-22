// TypeScript types are now defined in the Mongoose models
// Import from server/models/ for type safety

export type { IUser } from '../server/models/User'
export type { IRole } from '../server/models/Role'
export type { IPermission } from '../server/models/Permission'
export type { IDistrict } from '../server/models/District'
export type { ISchool } from '../server/models/School'
export type { IApplication } from '../server/models/Application'
export type { IDocument } from '../server/models/Document'
export type { ICommunication } from '../server/models/Communication'
export type { ISiteVisit } from '../server/models/SiteVisit'
export type { IClassroom } from '../server/models/Classroom'
export type { IAuditLog } from '../server/models/AuditLog'

// Re-export mongoose types for convenience
export type { Document, Model } from 'mongoose'
