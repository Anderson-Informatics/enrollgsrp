import FormSchema from '../../../models/FormSchema'
import { requirePermission } from '../../../utils/require-permission'
import { logAuditEntry } from '../../../utils/audit-log'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'form_schemas:write')

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Form schema ID is required'
    })
  }

  const body = await readBody(event)
  const auth = event.context.auth

  const existing = await FormSchema.findById(id)
  if (!existing) {
    throw createError({
      statusCode: 404,
      message: 'Form schema not found'
    })
  }

  // Build update object with only provided fields
  const updates: Record<string, unknown> = {}
  if (body.name !== undefined) updates.name = body.name
  if (body.description !== undefined) updates.description = body.description
  if (body.version !== undefined) updates.version = body.version
  if (body.scope !== undefined) updates.scope = body.scope
  if (body.scopeId !== undefined) updates.scopeId = body.scopeId
  if (body.fields !== undefined) {
    if (!Array.isArray(body.fields) || body.fields.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Fields array must not be empty'
      })
    }
    // Validate each field
    for (const field of body.fields) {
      if (!field.id || !field.type || !field.label) {
        throw createError({
          statusCode: 400,
          message: 'Each field must have id, type, and label'
        })
      }
    }
    updates.fields = body.fields
  }
  if (body.isActive !== undefined) updates.isActive = body.isActive

  const updated = await FormSchema.findByIdAndUpdate(id, { $set: updates }, { new: true })
    .populate('createdBy', 'firstName lastName email')
    .lean()

  // Log audit entry
  await logAuditEntry({
    actorId: auth?.userId!,
    actorEmail: auth?.email,
    action: 'update',
    resourceType: 'form_schema',
    resourceId: id,
    details: { changes: Object.keys(updates) }
  })

  return updated
})
