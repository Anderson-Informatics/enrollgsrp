import { describe, it, expect, beforeAll } from 'vitest'
import { apiRequest, uniqueEmail } from '../../helpers'

interface AuthResponse {
  success: boolean
  token: string
  user: { email: string, role: string }
}

interface ErrorResponse {
  statusCode: number
  message: string
}

describe('POST /api/auth/login', () => {
  const email = uniqueEmail('login')
  const password = 'TestPassword123'

  beforeAll(async () => {
    const res = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstName: 'Login',
        lastName: 'Test',
        role: 'parent'
      })
    })
    expect(res.status).toBe(200)
  })

  it('logs in with valid credentials', async () => {
    const res = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    expect(res.status).toBe(200)
    expect(res.body.token).toBeTruthy()
    expect(res.body.user.email).toBe(email)
  })

  it('rejects missing credentials', async () => {
    const res = await apiRequest<ErrorResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
    expect(res.status).toBe(400)
  })

  it('rejects unknown email', async () => {
    const res = await apiRequest<ErrorResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: uniqueEmail('unknown'), password })
    })
    expect(res.status).toBe(401)
  })

  it('rejects wrong password', async () => {
    const res = await apiRequest<ErrorResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: 'WrongPassword123' })
    })
    expect(res.status).toBe(401)
  })
})
