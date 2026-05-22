import { describe, it, expect } from 'vitest'
import { apiRequest } from '../helpers'

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await apiRequest<{ status: string, timestamp: string, mongodb: string }>('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })

  it('returns a valid ISO timestamp', async () => {
    const res = await apiRequest<{ timestamp: string }>('/api/health')
    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp)
  })

  it('reports mongodb connection state', async () => {
    const res = await apiRequest<{ mongodb: string }>('/api/health')
    expect(['connected', 'disconnected']).toContain(res.body.mongodb)
  })

  it('does not require authentication', async () => {
    const res = await apiRequest('/api/health')
    expect(res.status).not.toBe(401)
  })
})
