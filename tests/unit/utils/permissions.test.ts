// @vitest-environment node
import { describe, it, expect } from 'vitest'
import {
  PERMISSION_CODES,
  ROLE_PRESETS,
  getPermissionsForRole,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions
} from '../../../server/utils/permissions'

describe('Permission presets', () => {
  it('exposes a stable catalog of permission codes', () => {
    expect(PERMISSION_CODES).toContain('users:read')
    expect(PERMISSION_CODES).toContain('users:write')
    expect(PERMISSION_CODES).toContain('permissions:manage')
    expect(PERMISSION_CODES).toContain('applications:read:all')
    expect(PERMISSION_CODES).toContain('applications:read:own')
  })

  it('defines presets for every supported role', () => {
    expect(Object.keys(ROLE_PRESETS).sort()).toEqual([
      'county_admin',
      'district_admin',
      'parent',
      'school_admin',
      'super_admin',
      'teacher'
    ])
  })

  it('grants super_admin every permission code', () => {
    const perms = getPermissionsForRole('super_admin')
    for (const code of PERMISSION_CODES) {
      expect(perms).toContain(code)
    }
  })

  it('restricts parent to their own data', () => {
    const perms = getPermissionsForRole('parent')
    expect(perms).toContain('applications:read:own')
    expect(perms).not.toContain('applications:read:all')
    expect(perms).not.toContain('users:write')
  })

  it('restricts teacher to assigned applications', () => {
    const perms = getPermissionsForRole('teacher')
    expect(perms).toContain('applications:read:assigned')
    expect(perms).not.toContain('applications:read:all')
    expect(perms).not.toContain('users:write')
  })

  it('returns an empty list for unknown roles', () => {
    expect(getPermissionsForRole('unknown' as never)).toEqual([])
  })
})

describe('hasPermission', () => {
  it('returns true when the user has the code', () => {
    expect(hasPermission(['users:read', 'users:write'], 'users:read')).toBe(true)
  })

  it('returns false when missing', () => {
    expect(hasPermission(['users:read'], 'users:write')).toBe(false)
  })

  it('returns false when the user has no permissions', () => {
    expect(hasPermission([], 'users:read')).toBe(false)
  })

  it('respects the special "*" wildcard', () => {
    expect(hasPermission(['*'], 'anything:goes')).toBe(true)
  })
})

describe('hasAnyPermission', () => {
  it('returns true when at least one code matches', () => {
    expect(hasAnyPermission(['a', 'b'], ['b', 'c'])).toBe(true)
  })

  it('returns false when none match', () => {
    expect(hasAnyPermission(['a'], ['b', 'c'])).toBe(false)
  })

  it('returns false for an empty required list', () => {
    expect(hasAnyPermission(['a'], [])).toBe(false)
  })

  it('respects wildcard', () => {
    expect(hasAnyPermission(['*'], ['anything'])).toBe(true)
  })
})

describe('hasAllPermissions', () => {
  it('returns true when every required code is present', () => {
    expect(hasAllPermissions(['a', 'b', 'c'], ['a', 'b'])).toBe(true)
  })

  it('returns false when any code is missing', () => {
    expect(hasAllPermissions(['a'], ['a', 'b'])).toBe(false)
  })

  it('returns true for an empty required list', () => {
    expect(hasAllPermissions(['a'], [])).toBe(true)
  })

  it('respects wildcard', () => {
    expect(hasAllPermissions(['*'], ['a', 'b', 'c'])).toBe(true)
  })
})
