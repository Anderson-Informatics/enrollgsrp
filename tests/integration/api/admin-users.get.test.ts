import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../helpers'

async function registerAs(role: string): Promise<string> {
  const res = await apiRequest<{ token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`perm-${role}`),
      password: 'TestPassword123',
      firstName: 'Perm',
      lastName: 'Test',
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return res.body.token
}

describe('GET /api/admin/users (requires users:read)', () => {
  let superAdminToken = ''
  let parentToken = ''
  let teacherToken = ''

  beforeAll(async () => {
    superAdminToken = await registerAs('super_admin')
    parentToken = await registerAs('parent')
    teacherToken = await registerAs('teacher')
  })

  it('rejects unauthenticated requests', async () => {
    const res = await apiRequest('/api/admin/users')
    expect(res.status).toBe(401)
  })

  it('rejects authenticated users without users:read (parent)', async () => {
    const res = await apiRequest<{ message: string }>('/api/admin/users', {
      headers: { Authorization: `Bearer ${parentToken}` }
    })
    expect(res.status).toBe(403)
    expect(res.body.message).toMatch(/permission/i)
  })

  it('rejects authenticated users without users:read (teacher)', async () => {
    const res = await apiRequest('/api/admin/users', {
      headers: { Authorization: `Bearer ${teacherToken}` }
    })
    expect(res.status).toBe(403)
  })

  it('allows super_admin', async () => {
    const res = await apiRequest<{ users: unknown[] }>('/api/admin/users', {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.users)).toBe(true)
  })
})
