import type { H3Event } from 'h3'
import AuditLogModel from '../models/AuditLog'

interface PermissionChangeDetails {
  targetUserId: string
  added: string[]
  removed: string[]
}

interface AuditEntry {
  actorId: string
  actorEmail?: string
  action: string
  resourceType: string
  resourceId?: string
  details?: Record<string, unknown>
}

export async function logPermissionChange(
  event: H3Event,
  details: PermissionChangeDetails
): Promise<void> {
  try {
    const actorId = event.context.auth?.userId
    await AuditLogModel.create({
      userId: actorId,
      action: 'update',
      resourceType: 'user_permissions',
      resourceId: details.targetUserId,
      details,
      ipAddress: getRequestIP(event, { xForwardedFor: true }),
      userAgent: getHeader(event, 'user-agent')
    })
  } catch (err) {
    // Audit log failures must never break the main flow
    console.error('[audit] Failed to write audit log entry:', err)
  }
}

export async function logAuditEntry(entry: AuditEntry): Promise<void> {
  try {
    await AuditLogModel.create({
      userId: entry.actorId,
      action: entry.action,
      resourceType: entry.resourceType,
      resourceId: entry.resourceId,
      details: entry.details
    })
  } catch (err) {
    // Audit log failures must never break the main flow
    console.error('[audit] Failed to write audit log entry:', err)
  }
}
