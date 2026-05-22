import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../helpers'

async function registerAs(role: string): Promise<string> {
  const res = await apiRequest<{ token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`form-patch-${role}`),
      password: 'TestPassword123',
      firstName: 'Form',
      lastName: 'Test',
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return res.body.token
}

describe('PATCH /api/admin/form-schemas/:id (requires form_schemas:write)', () => {
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
        name: 'Test Schema for Patch',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    createdSchemaId = createRes.body._id
  })

  it('rejects unauthenticated requests', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: 'Updated Name' })
    })
    expect(res.status).toBe(401)
  })

  it('rejects authenticated users without form_schemas:write', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${parentToken}` },
      body: JSON.stringify({ name: 'Updated Name' })
    })
    expect(res.status).toBe(403)
  })

  it('returns 404 for non-existent schema', async () => {
    const res = await apiRequest('/api/admin/form-schemas/507f1f77bcf86cd799439011', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({ name: 'Updated Name' })
    })
    expect(res.status).toBe(404)
  })

  it('allows updating name', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({ name: 'Updated Schema Name' })
    })
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Updated Schema Name')
  })

  it('allows updating isActive', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({ isActive: false })
    })
    expect(res.status).toBe(200)
    expect(res.body.isActive).toBe(false)
  })
})
