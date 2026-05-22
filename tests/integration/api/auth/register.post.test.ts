import { describe, it, expect } from 'vitest'
import { apiRequest, uniqueEmail } from '../../helpers'

interface RegisterResponse {
  success: boolean
  token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
}

interface ErrorResponse {
  statusCode: number
  message: string
}

function validRegisterPayload(overrides: Record<string, unknown> = {}) {
  return {
    email: uniqueEmail('register'),
    password: 'TestPassword123',
    firstName: 'Test',
    lastName: 'User',
    role: 'parent',
    ...overrides
  }
}

describe('POST /api/auth/register', () => {
  it('registers a new user and returns a token', async () => {
    const payload = validRegisterPayload()
    const res = await apiRequest<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.token).toBeTruthy()
    expect(res.body.user.email).toBe(payload.email)
    expect(res.body.user.role).toBe('parent')
    expect(res.body.user).not.toHaveProperty('passwordHash')
  })

  it('rejects missing required fields', async () => {
    const res = await apiRequest<ErrorResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: uniqueEmail() })
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/required/i)
  })

  it('rejects invalid email format', async () => {
    const res = await apiRequest<ErrorResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(validRegisterPayload({ email: 'not-an-email' }))
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/email/i)
  })

  it('rejects passwords shorter than 8 characters', async () => {
    const res = await apiRequest<ErrorResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(validRegisterPayload({ password: 'short' }))
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/password/i)
  })

  it('rejects invalid roles', async () => {
    const res = await apiRequest<ErrorResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(validRegisterPayload({ role: 'hacker' }))
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/role/i)
  })

  it('rejects duplicate emails', async () => {
    const payload = validRegisterPayload()
    const first = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    expect(first.status).toBe(200)

    const second = await apiRequest<ErrorResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    expect(second.status).toBe(409)
    expect(second.body.message).toMatch(/exists/i)
  })
})
