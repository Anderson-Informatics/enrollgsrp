import FormSchema from '../../models/FormSchema'
import { requirePermission } from '../../utils/require-permission'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'form_schemas:read')

  const query = getQuery(event)
  const scope = query.scope as string | undefined
  const scopeId = query.scopeId as string | undefined
  const isActive = query.isActive as string | undefined
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20))

  const filter: Record<string, unknown> = {}
  if (scope) filter.scope = scope
  if (scopeId) filter.scopeId = scopeId
  if (isActive !== undefined) filter.isActive = isActive === 'true'

  const [schemas, total] = await Promise.all([
    FormSchema.find(filter)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    FormSchema.countDocuments(filter)
  ])

  return { schemas, total, page, limit }
})
