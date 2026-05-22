import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../helpers'

describe('Auth middleware', () => {
  let validToken = ''

  beforeAll(async () => {
    const email = uniqueEmail('mw')
    const res = await apiRequest<{ token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password: 'TestPassword123',
        firstName: 'Mw',
        lastName: 'Test',
        role: 'parent'
      })
    })
    validToken = res.body.token
  })

  it('allows public health endpoint without a token', async () => {
    const res = await apiRequest('/api/health')
    expect(res.status).toBe(200)
  })

  it('allows public register endpoint without a token', async () => {
    // We just confirm middleware does not 401 — actual body errors are fine.
    const res = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({})
    })
    expect(res.status).not.toBe(401)
  })

  it('rejects protected routes without an Authorization header', async () => {
    const res = await apiRequest<{ message: string }>('/api/protected-test')
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/authorization/i)
  })

  it('rejects protected routes with malformed Authorization header', async () => {
    const res = await apiRequest('/api/protected-test', {
      headers: { Authorization: 'NotBearer abc' }
    })
    expect(res.status).toBe(401)
  })

  it('rejects protected routes with an invalid token', async () => {
    const res = await apiRequest<{ message: string }>('/api/protected-test', {
      headers: { Authorization: 'Bearer not.a.real.token' }
    })
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/invalid|expired/i)
  })

  it('passes auth middleware with a valid token (route may 404)', async () => {
    // Route may not exist, but middleware should let it through (so not 401).
    const res = await apiRequest('/api/protected-test', {
      headers: { Authorization: `Bearer ${validToken}` }
    })
    expect(res.status).not.toBe(401)
  })
})
