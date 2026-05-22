import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../../helpers'

async function registerAs(role: string): Promise<{ token: string, userId: string }> {
  const res = await apiRequest<{ token: string, user: { id: string } }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`al-${role}`),
      password: 'TestPassword123',
      firstName: 'Test',
      lastName: role,
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return { token: res.body.token, userId: res.body.user.id }
}

describe('GET /api/admin/audit-log', () => {
  let superAdminToken = ''
  let parentToken = ''
  let targetUserId = ''

  beforeAll(async () => {
    superAdminToken = (await registerAs('super_admin')).token
    parentToken = (await registerAs('parent')).token
    targetUserId = (await registerAs('teacher')).userId

    // Generate an audit log entry via a permission change
    await apiRequest(`/api/admin/users/${targetUserId}/permissions`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({ grant: ['users:read'] })
    })
  })

  it('returns audit log entries for super_admin', async () => {
    const res = await apiRequest<{ entries: unknown[], total: number }>(
      '/api/admin/audit-log',
      { headers: { Authorization: `Bearer ${superAdminToken}` } }
    )
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.entries)).toBe(true)
    expect(typeof res.body.total).toBe('number')
  })

  it('returns entries with expected shape', async () => {
    const res = await apiRequest<{ entries: Array<{ action: string, resourceType: string, details: Record<string, unknown> }> }>(
      '/api/admin/audit-log',
      { headers: { Authorization: `Bearer ${superAdminToken}` } }
    )
    const entry = res.body.entries[0]
    expect(entry).toHaveProperty('action')
    expect(entry).toHaveProperty('resourceType')
    expect(entry).toHaveProperty('details')
  })

  it('supports filtering by resourceType', async () => {
    const res = await apiRequest<{ entries: Array<{ resourceType: string }> }>(
      '/api/admin/audit-log?resourceType=user_permissions',
      { headers: { Authorization: `Bearer ${superAdminToken}` } }
    )
    expect(res.status).toBe(200)
    for (const entry of res.body.entries) {
      expect(entry.resourceType).toBe('user_permissions')
    }
  })

  it('returns 403 for a user without audit_log:read', async () => {
    const res = await apiRequest('/api/admin/audit-log', {
      headers: { Authorization: `Bearer ${parentToken}` }
    })
    expect(res.status).toBe(403)
  })
})
