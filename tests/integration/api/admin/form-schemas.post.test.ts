import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../helpers'

async function registerAs(role: string): Promise<string> {
  const res = await apiRequest<{ token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`form-post-${role}`),
      password: 'TestPassword123',
      firstName: 'Form',
      lastName: 'Test',
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return res.body.token
}

describe('POST /api/admin/form-schemas (requires form_schemas:write)', () => {
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
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Form',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    expect(res.status).toBe(401)
  })

  it('rejects authenticated users without form_schemas:write (parent)', async () => {
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${parentToken}` },
      body: JSON.stringify({
        name: 'Test Form',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    expect(res.status).toBe(403)
  })

  it('rejects requests without name', async () => {
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    expect(res.status).toBe(400)
  })

  it('rejects requests without scope', async () => {
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({
        name: 'Test Form',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    expect(res.status).toBe(400)
  })

  it('rejects requests without fields', async () => {
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({
        name: 'Test Form',
        scope: 'county'
      })
    })
    expect(res.status).toBe(400)
  })

  it('allows super_admin to create county form', async () => {
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({
        name: 'Test County Form',
        description: 'A test form',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Test County Form')
    expect(res.body.scope).toBe('county')
  })

  it('allows county_admin to create form', async () => {
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${countyAdminToken}` },
      body: JSON.stringify({
        name: 'Test Form 2',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    expect(res.status).toBe(200)
  })

  it('allows district_admin to create form', async () => {
    const res = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${districtAdminToken}` },
      body: JSON.stringify({
        name: 'Test District Form',
        scope: 'district',
        scopeId: '507f1f77bcf86cd799439011',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    expect(res.status).toBe(200)
  })
})
