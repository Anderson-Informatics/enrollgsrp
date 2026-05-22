import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../helpers'

async function registerAs(role: string): Promise<string> {
  const res = await apiRequest<{ token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: uniqueEmail(`form-delete-${role}`),
      password: 'TestPassword123',
      firstName: 'Form',
      lastName: 'Test',
      role
    })
  })
  expect(res.status, JSON.stringify(res.body)).toBe(200)
  return res.body.token
}

describe('DELETE /api/admin/form-schemas/:id (requires form_schemas:delete)', () => {
  let superAdminToken = ''
  let countyAdminToken = ''
  let districtAdminToken = ''
  let parentToken = ''
  let createdSchemaId = ''

  beforeAll(async () => {
    superAdminToken = await registerAs('super_admin')
    countyAdminToken = await registerAs('county_admin')
    districtAdminToken = await registerAs('district_admin')
    parentToken = await registerAs('parent')

    // Create a test schema
    const createRes = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({
        name: 'Test Schema for Delete',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    createdSchemaId = createRes.body._id
  })

  it('rejects unauthenticated requests', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'DELETE'
    })
    expect(res.status).toBe(401)
  })

  it('rejects authenticated users without form_schemas:delete (parent)', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${parentToken}` }
    })
    expect(res.status).toBe(403)
  })

  it('rejects authenticated users without form_schemas:delete (district_admin)', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${districtAdminToken}` }
    })
    expect(res.status).toBe(403)
  })

  it('returns 404 for non-existent schema', async () => {
    const res = await apiRequest('/api/admin/form-schemas/507f1f77bcf86cd799439011', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(404)
  })

  it('allows super_admin to delete', async () => {
    const res = await apiRequest(`/api/admin/form-schemas/${createdSchemaId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${superAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('allows county_admin to delete', async () => {
    // Create another schema for this test
    const createRes = await apiRequest('/api/admin/form-schemas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: JSON.stringify({
        name: 'Test Schema for County Delete',
        scope: 'county',
        fields: [{ id: 'field1', type: 'text', label: 'Test Field', order: 1, validations: [] }]
      })
    })
    const schemaId = createRes.body._id

    const res = await apiRequest(`/api/admin/form-schemas/${schemaId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${countyAdminToken}` }
    })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })
})
