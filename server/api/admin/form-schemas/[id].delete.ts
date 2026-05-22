import FormSchema from '../../../models/FormSchema'
import { requirePermission } from '../../../utils/require-permission'
import { logAuditEntry } from '../../../utils/audit-log'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'form_schemas:delete')

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Form schema ID is required'
    })
  }

  const existing = await FormSchema.findById(id)
  if (!existing) {
    throw createError({
      statusCode: 404,
      message: 'Form schema not found'
    })
  }

  await FormSchema.findByIdAndDelete(id)

  // Log audit entry
  const auth = event.context.auth
  await logAuditEntry({
    actorId: auth?.userId!,
    actorEmail: auth?.email,
    action: 'delete',
    resourceType: 'form_schema',
    resourceId: id,
    details: { name: existing.name }
  })

  return { success: true }
})
