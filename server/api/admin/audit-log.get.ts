import AuditLogModel from '../../models/AuditLog'
import { requirePermission } from '../../utils/require-permission'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'audit_log:read')

  const query = getQuery(event)
  const resourceType = query.resourceType as string | undefined
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 50))

  const filter: Record<string, unknown> = {}
  if (resourceType) filter.resourceType = resourceType

  const [entries, total] = await Promise.all([
    AuditLogModel.find(filter)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    AuditLogModel.countDocuments(filter)
  ])

  return { entries, total, page, limit }
})
