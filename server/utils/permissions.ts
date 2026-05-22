/**
 * Granular permission system.
 *
 * Permission codes follow the pattern `<resource>:<action>[:<scope>]`.
 * Scopes:
 *   - `all`      → across all districts/schools (county level)
 *   - `district` → user's own district
 *   - `school`   → user's own school
 *   - `assigned` → records explicitly assigned to the user
 *   - `own`      → records owned by the user (e.g. a parent's own applications)
 *
 * The wildcard code `*` grants every permission and is reserved for super_admin
 * and emergency break-glass scenarios.
 */

export const WILDCARD_PERMISSION = '*' as const

export const PERMISSION_CODES = [
  // User & permission management
  'users:read',
  'users:write',
  'users:delete',
  'permissions:manage',
  'audit_log:read',

  // Form schemas
  'form_schemas:read',
  'form_schemas:write',
  'form_schemas:delete',

  // Applications
  'applications:read:all',
  'applications:read:district',
  'applications:read:school',
  'applications:read:assigned',
  'applications:read:own',
  'applications:write:all',
  'applications:write:district',
  'applications:write:school',
  'applications:write:assigned',
  'applications:write:own',
  'applications:delete',

  // Documents
  'documents:read:all',
  'documents:read:assigned',
  'documents:read:own',
  'documents:write:assigned',
  'documents:write:own',
  'documents:verify',

  // Schools & districts
  'schools:read',
  'schools:write',
  'districts:read',
  'districts:write',

  // Communications
  'communications:send',
  'communications:read:all',
  'communications:read:assigned',

  // Reporting
  'reports:read:all',
  'reports:read:district',
  'reports:read:school',
  'reports:export'
] as const

export type PermissionCode = typeof PERMISSION_CODES[number]
export type Role = 'super_admin' | 'county_admin' | 'district_admin' | 'school_admin' | 'teacher' | 'parent'

export const ROLE_PRESETS: Record<Role, PermissionCode[] | [typeof WILDCARD_PERMISSION]> = {
  super_admin: [WILDCARD_PERMISSION],

  county_admin: [
    'users:read',
    'users:write',
    'audit_log:read',
    'form_schemas:read',
    'form_schemas:write',
    'form_schemas:delete',
    'applications:read:all',
    'applications:write:all',
    'documents:read:all',
    'schools:read',
    'schools:write',
    'districts:read',
    'districts:write',
    'communications:read:all',
    'communications:send',
    'reports:read:all',
    'reports:export'
  ],

  district_admin: [
    'users:read',
    'users:write',
    'form_schemas:read',
    'form_schemas:write',
    'applications:read:district',
    'applications:write:district',
    'documents:read:all',
    'schools:read',
    'schools:write',
    'districts:read',
    'communications:read:all',
    'communications:send',
    'reports:read:district',
    'reports:export'
  ],

  school_admin: [
    'users:read',
    'form_schemas:read',
    'applications:read:school',
    'applications:write:school',
    'documents:read:all',
    'documents:verify',
    'schools:read',
    'communications:read:all',
    'communications:send',
    'reports:read:school'
  ],

  teacher: [
    'applications:read:assigned',
    'applications:write:assigned',
    'documents:read:assigned',
    'documents:write:assigned',
    'documents:verify',
    'communications:read:assigned',
    'communications:send'
  ],

  parent: [
    'applications:read:own',
    'applications:write:own',
    'documents:read:own',
    'documents:write:own'
  ]
}

const ROLE_LOOKUP = new Set<string>(Object.keys(ROLE_PRESETS))

export function getPermissionsForRole(role: Role | string): string[] {
  if (!ROLE_LOOKUP.has(role)) return []
  const preset = ROLE_PRESETS[role as Role]
  // Expand wildcard to the full code list so stored user.permissions stays auditable.
  if (preset.length === 1 && preset[0] === WILDCARD_PERMISSION) {
    return [...PERMISSION_CODES]
  }
  return [...preset]
}

export function hasPermission(userPermissions: readonly string[], required: string): boolean {
  if (userPermissions.includes(WILDCARD_PERMISSION)) return true
  return userPermissions.includes(required)
}

export function hasAnyPermission(userPermissions: readonly string[], required: readonly string[]): boolean {
  if (required.length === 0) return false
  if (userPermissions.includes(WILDCARD_PERMISSION)) return true
  return required.some(code => userPermissions.includes(code))
}

export function hasAllPermissions(userPermissions: readonly string[], required: readonly string[]): boolean {
  if (required.length === 0) return true
  if (userPermissions.includes(WILDCARD_PERMISSION)) return true
  return required.every(code => userPermissions.includes(code))
}
