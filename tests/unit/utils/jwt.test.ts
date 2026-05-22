// @vitest-environment node
import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import type { JWTPayload } from '../../../server/utils/jwt'
import { generateToken, verifyToken, decodeToken } from '../../../server/utils/jwt'

describe('JWT Utilities', () => {
  const originalSecret = process.env.JWT_SECRET

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret-key'
  })

  afterAll(() => {
    if (originalSecret) {
      process.env.JWT_SECRET = originalSecret
    } else {
      delete process.env.JWT_SECRET
    }
  })

  it('should generate a valid token', () => {
    const payload: JWTPayload = {
      userId: '123',
      email: 'test@example.com',
      role: 'parent'
    }

    const token = generateToken(payload)

    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
    expect(token.split('.')).toHaveLength(3) // JWT has 3 parts
  })

  it('should verify a valid token', () => {
    const payload: JWTPayload = {
      userId: '123',
      email: 'test@example.com',
      role: 'parent'
    }

    const token = generateToken(payload)
    const decoded = verifyToken(token)

    expect(decoded).not.toBeNull()
    expect(decoded?.userId).toBe(payload.userId)
    expect(decoded?.email).toBe(payload.email)
    expect(decoded?.role).toBe(payload.role)
  })

  it('should return null for invalid token', () => {
    const invalidToken = 'invalid.token.here'
    const decoded = verifyToken(invalidToken)

    expect(decoded).toBeNull()
  })

  it('should return null for invalid token', () => {
    const invalidToken = 'invalid.token.here'
    const decoded = verifyToken(invalidToken)

    expect(decoded).toBeNull()
  })

  it('should decode a token without verification', () => {
    const payload: JWTPayload = {
      userId: '123',
      email: 'test@example.com',
      role: 'parent'
    }

    const token = generateToken(payload)
    const decoded = decodeToken(token)

    expect(decoded).not.toBeNull()
    expect(decoded?.userId).toBe(payload.userId)
    expect(decoded?.email).toBe(payload.email)
    expect(decoded?.role).toBe(payload.role)
  })

  it('should return null when decoding invalid token', () => {
    const invalidToken = 'invalid.token.here'
    const decoded = decodeToken(invalidToken)

    expect(decoded).toBeNull()
  })

  it('should handle tokens with different roles', () => {
    const roles: JWTPayload['role'][] = ['super_admin', 'county_admin', 'district_admin', 'school_admin', 'teacher', 'parent']

    roles.forEach((role) => {
      const payload: JWTPayload = {
        userId: '123',
        email: 'test@example.com',
        role
      }

      const token = generateToken(payload)
      const decoded = verifyToken(token)

      expect(decoded?.role).toBe(role)
    })
  })

  it('should handle tokens with special characters in email', () => {
    const payload: JWTPayload = {
      userId: '123',
      email: 'test+user@example.com',
      role: 'parent'
    }

    const token = generateToken(payload)
    const decoded = verifyToken(token)

    expect(decoded?.email).toBe(payload.email)
  })
})
