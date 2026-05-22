import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../../helpers'

async function registerAs(role: string): Promise<{ token: string, userId: string }> {
  const res = await apiRequest<{ token: string, user: { id: string } }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`perm-upd-${role}`),
      password: 'TestPassword123',
      firstName: 'Test',
      lastName: role,
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return { token: res.body.token, userId: res.body.user.id }
}

describe('PATCH /api/admin/users/:id/permissions', () => {
  let superAdminToken = ''
  let parentToken = ''
  let targetUserId = ''

  beforeAll(async () => {
    superAdminToken = (await registerAs('super_admin')).token
    parentToken = (await registerAs('parent')).token
    targetUserId = (await registerAs('teacher')).userId
  })

  it('grants additional permissions to a user', async () => {
    const res = await apiRequest<{ user: { permissions: string[] } }>(
      `/api/admin/users/${targetUserId}/permissions`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superAdminToken}` },
        body: JSON.stringify({ grant: ['users:read'] })
      }
    )
    expect(res.status).toBe(200)
    expect(res.body.user.permissions).toContain('users:read')
    expect(res.body.user.permissions).toContain('applications:read:assigned')
  })

  it('revokes permissions from a user', async () => {
    const res = await apiRequest<{ user: { permissions: string[] } }>(
      `/api/admin/users/${targetUserId}/permissions`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superAdminToken}` },
        body: JSON.stringify({ revoke: ['users:read'] })
      }
    )
    expect(res.status).toBe(200)
    expect(res.body.user.permissions).not.toContain('users:read')
  })

  it('returns 403 for a user without permissions:manage', async () => {
    const res = await apiRequest(`/api/admin/users/${targetUserId}/permissions`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${parentToken}` },
      body: JSON.stringify({ grant: ['users:read'] })
    })
    expect(res.status).toBe(403)
  })

  it('ignores unknown permission codes gracefully', async () => {
    const res = await apiRequest<{ user: { permissions: string[] } }>(
      `/api/admin/users/${targetUserId}/permissions`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superAdminToken}` },
        body: JSON.stringify({ grant: ['not:a:real:code'] })
      }
    )
    expect(res.status).toBe(400)
  })
})
