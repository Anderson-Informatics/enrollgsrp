import type { H3Event } from 'h3'
import User from '../models/User'
import { hasAllPermissions, hasAnyPermission, hasPermission } from './permissions'

/**
 * Resolve the latest set of permissions for the authenticated user.
 *
 * We re-fetch from the DB so revoked permissions take effect immediately
 * (the JWT only carries identity, not authorization claims).
 */
async function getCurrentPermissions(event: H3Event): Promise<string[]> {
  const auth = event.context.auth
  if (!auth?.userId) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const user = await User.findById(auth.userId).select('permissions isActive').lean()
  if (!user || !user.isActive) {
    throw createError({ statusCode: 401, message: 'User not found or inactive' })
  }
  return user.permissions ?? []
}

export async function requirePermission(event: H3Event, code: string): Promise<void> {
  const perms = await getCurrentPermissions(event)
  if (!hasPermission(perms, code)) {
    throw createError({
      statusCode: 403,
      message: `Missing required permission: ${code}`
    })
  }
}

export async function requireAnyPermission(event: H3Event, codes: string[]): Promise<void> {
  const perms = await getCurrentPermissions(event)
  if (!hasAnyPermission(perms, codes)) {
    throw createError({
      statusCode: 403,
      message: `Missing one of required permissions: ${codes.join(', ')}`
    })
  }
}

export async function requireAllPermissions(event: H3Event, codes: string[]): Promise<void> {
  const perms = await getCurrentPermissions(event)
  if (!hasAllPermissions(perms, codes)) {
    throw createError({
      statusCode: 403,
      message: `Missing all required permissions: ${codes.join(', ')}`
    })
  }
}
