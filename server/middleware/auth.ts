import { verifyToken } from '../utils/jwt'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  // Only enforce auth on API routes; page requests are handled by client-side guards
  if (!url.pathname.startsWith('/api/')) {
    return
  }

  // Public API routes (exact-prefix match)
  const publicApiRoutes = ['/api/auth/login', '/api/auth/register', '/api/health', '/api/_nuxt_icon']
  if (publicApiRoutes.some(route => url.pathname === route || url.pathname.startsWith(`${route}/`))) {
    return
  }

  // Get token from Authorization header
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: 'Authorization header missing or invalid'
    })
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix

  // Verify token
  const payload = verifyToken(token)
  if (!payload) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token'
    })
  }

  // Attach user info to event context
  event.context.auth = {
    userId: payload.userId,
    email: payload.email,
    role: payload.role
  }
})

// Type augmentation for event context
declare module 'h3' {
  interface H3EventContext {
    auth?: {
      userId: string
      email: string
      role: string
    }
  }
}
