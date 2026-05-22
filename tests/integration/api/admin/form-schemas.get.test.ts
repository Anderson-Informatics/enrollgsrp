import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../helpers'

async function registerAs(role: string): Promise<string> {
  const res = await apiRequest<{ token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`form-${role}`),
      password: 'TestPassword123',
      firstName: 'Form',
      lastName: 'Test',
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return res.body.token
}

describe('GET /api/admin/form-schemas (requires form_schemas:read)', () => {
  let superAdminToken = ''
  let countyAdminToken = ''
  let districtAdminToken = ''
  let schoolAdminToken = ''
  let parentToken = ''

  beforeAll(async () => {
    superAdminToken = await registerAs('super_admin')
    countyAdminToken = await registerAs('county_admin')
    districtAdminToken = await registerAs('district_admin')
    schoolAdminToken = await registerAs('school_admin')
    parentToken = await registerAs('parent')
  })

  it('rejects unauthenticated requests', async () => {
    const res = await apiRequest('/api/admin/form-schemas')
    expect(res.status).toBe(401)
  })

  it('rejects authenticated users without form_schemas:read (parent)', async () => {
    const res = await apiRequest<{ message: string }>('/api/admin/form-schemas', {
      headers: { Authorization: `Bearer ${parentToken}` }
    })
    expect(res.status).toBe(403)
    expect(res.body.message).toMatch(/permission/i)
  })

  it('allows super_admin', async () => {
    const res = await apiRequest<{ schemas: unknown[] }>('/api/admin/form-schemas', {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.schemas)).toBe(true)
  })

  it('allows county_admin', async () => {
    const res = await apiRequest<{ schemas: unknown[] }>('/api/admin/form-schemas', {
      headers: { Authorization: `Bearer ${countyAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.schemas)).toBe(true)
  })

  it('allows district_admin', async () => {
    const res = await apiRequest<{ schemas: unknown[] }>('/api/admin/form-schemas', {
      headers: { Authorization: `Bearer ${districtAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.schemas)).toBe(true)
  })

  it('allows school_admin', async () => {
    const res = await apiRequest<{ schemas: unknown[] }>('/api/admin/form-schemas', {
      headers: { Authorization: `Bearer ${schoolAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.schemas)).toBe(true)
  })

  it('supports scope filter', async () => {
    const res = await apiRequest<{ schemas: unknown[] }>('/api/admin/form-schemas?scope=county', {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.schemas)).toBe(true)
  })

  it('supports pagination', async () => {
    const res = await apiRequest<{ schemas: unknown[]; page: number; limit: number }>('/api/admin/form-schemas?page=1&limit=10', {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(res.body.page).toBe(1)
    expect(res.body.limit).toBe(10)
  })
})
