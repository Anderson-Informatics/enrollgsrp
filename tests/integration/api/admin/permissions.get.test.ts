import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../../helpers'

async function registerAs(role: string): Promise<string> {
  const res = await apiRequest<{ token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`pc-${role}`),
      password: 'TestPassword123',
      firstName: 'Test',
      lastName: role,
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return res.body.token
}

describe('GET /api/admin/permissions', () => {
  let superAdminToken = ''
  let parentToken = ''

  beforeAll(async () => {
    superAdminToken = await registerAs('super_admin')
    parentToken = await registerAs('parent')
  })

  it('returns all permission codes for super_admin', async () => {
    const res = await apiRequest<{ permissions: Array<{ code: string, name: string, category: string }> }>(
      '/api/admin/permissions',
      { headers: { Authorization: `Bearer ${superAdminToken}` } }
    )
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.permissions)).toBe(true)
    expect(res.body.permissions.length).toBeGreaterThan(0)
    const codes = res.body.permissions.map(p => p.code)
    expect(codes).toContain('users:read')
    expect(codes).toContain('applications:read:own')
  })

  it('each permission has code, name, and category', async () => {
    const res = await apiRequest<{ permissions: Array<{ code: string, name: string, category: string }> }>(
      '/api/admin/permissions',
      { headers: { Authorization: `Bearer ${superAdminToken}` } }
    )
    for (const p of res.body.permissions) {
      expect(typeof p.code).toBe('string')
      expect(typeof p.name).toBe('string')
      expect(typeof p.category).toBe('string')
    }
  })

  it('returns 403 for a user without permissions:manage', async () => {
    const res = await apiRequest('/api/admin/permissions', {
      headers: { Authorization: `Bearer ${parentToken}` }
    })
    expect(res.status).toBe(403)
  })
})
