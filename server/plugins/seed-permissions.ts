import PermissionModel from '../models/Permission'
import { PERMISSION_CODES } from '../utils/permissions'

const PERMISSION_META: Record<string, { name: string, category: string }> = {
  'users:read': { name: 'View Users', category: 'users' },
  'users:write': { name: 'Manage Users', category: 'users' },
  'users:delete': { name: 'Delete Users', category: 'users' },
  'permissions:manage': { name: 'Manage Permissions', category: 'permissions' },
  'audit_log:read': { name: 'View Audit Log', category: 'audit' },
  'form_schemas:read': { name: 'View Form Schemas', category: 'forms' },
  'form_schemas:write': { name: 'Manage Form Schemas', category: 'forms' },
  'form_schemas:delete': { name: 'Delete Form Schemas', category: 'forms' },
  'applications:read:all': { name: 'View All Applications', category: 'applications' },
  'applications:read:district': { name: 'View District Applications', category: 'applications' },
  'applications:read:school': { name: 'View School Applications', category: 'applications' },
  'applications:read:assigned': { name: 'View Assigned Applications', category: 'applications' },
  'applications:read:own': { name: 'View Own Applications', category: 'applications' },
  'applications:write:all': { name: 'Edit All Applications', category: 'applications' },
  'applications:write:district': { name: 'Edit District Applications', category: 'applications' },
  'applications:write:school': { name: 'Edit School Applications', category: 'applications' },
  'applications:write:assigned': { name: 'Edit Assigned Applications', category: 'applications' },
  'applications:write:own': { name: 'Edit Own Applications', category: 'applications' },
  'applications:delete': { name: 'Delete Applications', category: 'applications' },
  'documents:read:all': { name: 'View All Documents', category: 'documents' },
  'documents:read:assigned': { name: 'View Assigned Documents', category: 'documents' },
  'documents:read:own': { name: 'View Own Documents', category: 'documents' },
  'documents:write:assigned': { name: 'Upload Assigned Documents', category: 'documents' },
  'documents:write:own': { name: 'Upload Own Documents', category: 'documents' },
  'documents:verify': { name: 'Verify Documents', category: 'documents' },
  'schools:read': { name: 'View Schools', category: 'schools' },
  'schools:write': { name: 'Manage Schools', category: 'schools' },
  'districts:read': { name: 'View Districts', category: 'districts' },
  'districts:write': { name: 'Manage Districts', category: 'districts' },
  'communications:send': { name: 'Send Communications', category: 'communications' },
  'communications:read:all': { name: 'View All Communications', category: 'communications' },
  'communications:read:assigned': { name: 'View Assigned Communications', category: 'communications' },
  'reports:read:all': { name: 'View All Reports', category: 'reports' },
  'reports:read:district': { name: 'View District Reports', category: 'reports' },
  'reports:read:school': { name: 'View School Reports', category: 'reports' },
  'reports:export': { name: 'Export Reports', category: 'reports' }
}

export default defineNitroPlugin(async () => {
  try {
    const ops = PERMISSION_CODES.map(code => ({
      updateOne: {
        filter: { code },
        update: {
          $setOnInsert: {
            code,
            name: PERMISSION_META[code]?.name ?? code,
            description: PERMISSION_META[code]?.name ?? code,
            category: PERMISSION_META[code]?.category ?? 'general'
          }
        },
        upsert: true
      }
    }))

    await PermissionModel.bulkWrite(ops, { ordered: false })
    console.log(`[seed] Permission catalog seeded (${PERMISSION_CODES.length} codes)`)
  } catch (err) {
    console.error('[seed] Failed to seed permissions:', err)
  }
})
