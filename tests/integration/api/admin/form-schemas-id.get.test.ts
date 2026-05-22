import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../helpers'

async function registerAs(role: string): Promise<string> {
  const res = await apiRequest<{ token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`form-id-${role}`),
      password: 'TestPassword123',
      firstName: 'Form',
      lastName: 'Test',
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return res.body.token
}

describe('GET /api/admin/form-schemas/:id (requires form_schemas:read)', () => {
  let superAdminToken = ''
  let parentToken = ''
  let createdSchemaId = ''

  beforeAll(async () => {
    superAdminToken = await registerAs('super_admin')
    parentToken = await registerAs('parent')

    // Create a test schema
    const createRes = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({
        name: 'Test Schema for Get',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    createdSchemaId = createRes.body._id
  })

  it('rejects unauthenticated requests', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`)
    expect(res.status).toBe(401)
  })

  it('rejects authenticated users without form_schemas:read', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      headers: { Authorization: `Bearer ${parentToken}` }
    })
    expect(res.status).toBe(403)
  })

  it('returns 404 for non-existent schema', async () => {
    const res = await apiRequest('/api/admin/form-schemas/507f1f77bcf86cd799439011', {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(404)
  })

  it('returns schema details for authorized user', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(res.body._id).toBe(createdSchemaId)
    expect(res.body.name).toBe('Test Schema for Get')
    expect(Array.isArray(res.body.fields)).toBe(true)
  })
})
