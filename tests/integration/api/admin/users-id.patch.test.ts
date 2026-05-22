import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../../helpers'

async function registerAs(role: string): Promise<{ token: string, userId: string }> {
  const res = await apiRequest<{ token: string, user: { id: string } }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`upd-${role}`),
      password: 'TestPassword123',
      firstName: 'Test',
      lastName: role,
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return { token: res.body.token, userId: res.body.user.id }
}

describe('PATCH /api/admin/users/:id', () => {
  let superAdminToken = ''
  let parentToken = ''
  let targetUserId = ''

  beforeAll(async () => {
    const sa = await registerAs('super_admin')
    superAdminToken = sa.token
    const teacher = await registerAs('teacher')
    parentToken = (await registerAs('parent')).token
    targetUserId = teacher.userId
  })

  it('allows super_admin to change a user role', async () => {
    const res = await apiRequest<{ user: { role: string } }>(
      `/api/admin/users/${targetUserId}`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superAdminToken}` },
        body: JSON.stringify({ role: 'school_admin' })
      }
    )
    expect(res.status).toBe(200)
    expect(res.body.user.role).toBe('school_admin')
  })

  it('reseeds permissions when role changes', async () => {
    const res = await apiRequest<{ user: { permissions: string[] } }>(
      `/api/admin/users/${targetUserId}`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superAdminToken}` },
        body: JSON.stringify({ role: 'teacher' })
      }
    )
    expect(res.status).toBe(200)
    expect(res.body.user.permissions).toContain('applications:read:assigned')
    expect(res.body.user.permissions).not.toContain('users:read')
  })

  it('allows super_admin to deactivate a user', async () => {
    const res = await apiRequest<{ user: { isActive: boolean } }>(
      `/api/admin/users/${targetUserId}`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superAdminToken}` },
        body: JSON.stringify({ isActive: false })
      }
    )
    expect(res.status).toBe(200)
    expect(res.body.user.isActive).toBe(false)
  })

  it('returns 403 for a user without users:write', async () => {
    const res = await apiRequest(`/api/admin/users/${targetUserId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${parentToken}` },
      body: JSON.stringify({ role: 'super_admin' })
    })
    expect(res.status).toBe(403)
  })

  it('returns 400 for an invalid role', async () => {
    const res = await apiRequest(`/api/admin/users/${targetUserId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({ role: 'hacker' })
    })
    expect(res.status).toBe(400)
  })
})
