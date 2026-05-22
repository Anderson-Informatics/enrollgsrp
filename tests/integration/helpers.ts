import { BASE_URL } from './setup'

export interface ApiResponse<T = unknown> {
  status: number
  body: T
  headers: Headers
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })

  let body: T
  const text = await res.text()
  try {
    body = text ? JSON.parse(text) : ({} as T)
  } catch {
    body = text as unknown as T
  }

  return {
    status: res.status,
    body,
    headers: res.headers
  }
}

export function uniqueEmail(prefix = 'test'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@integration.test`
}
