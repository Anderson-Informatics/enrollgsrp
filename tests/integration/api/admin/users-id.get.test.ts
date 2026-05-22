import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../../helpers'

async function registerAs(role: string): Promise<{ token: string, userId: string }> {
  const res = await apiRequest<{ token: string, user: { id: string } }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`uid-${role}`),
      password: 'TestPassword123',
      firstName: 'Test',
      lastName: role,
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return { token: res.body.token, userId: res.body.user.id }
}

describe('GET /api/admin/users/:id', () => {
  let superAdminToken = ''
  let parentToken = ''
  let targetUserId = ''

  beforeAll(async () => {
    const sa = await registerAs('super_admin')
    superAdminToken = sa.token
    const parent = await registerAs('parent')
    parentToken = parent.token
    targetUserId = parent.userId
  })

  it('returns user detail for super_admin', async () => {
    const res = await apiRequest<{ user: { _id: string, email: string, role: string, permissions: string[] } }>(
      `/api/admin/users/${targetUserId}`,
      { headers: { Authorization: `Bearer ${superAdminToken}` } }
    )
    expect(res.status).toBe(200)
    expect(res.body.user._id).toBe(targetUserId)
    expect(res.body.user.role).toBe('parent')
    expect(Array.isArray(res.body.user.permissions)).toBe(true)
    expect(res.body.user).not.toHaveProperty('passwordHash')
  })

  it('returns 403 for a user without users:read', async () => {
    const res = await apiRequest(`/api/admin/users/${targetUserId}`, {
      headers: { Authorization: `Bearer ${parentToken}` }
    })
    expect(res.status).toBe(403)
  })

  it('returns 401 without a token', async () => {
    const res = await apiRequest(`/api/admin/users/${targetUserId}`)
    expect(res.status).toBe(401)
  })

  it('returns 404 for a non-existent user id', async () => {
    const res = await apiRequest('/api/admin/users/000000000000000000000000', {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(404)
  })
})
