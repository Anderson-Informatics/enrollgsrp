import FormSchema from '../../models/FormSchema'
import { requirePermission } from '../../utils/require-permission'
import { logAuditEntry } from '../../utils/audit-log'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'form_schemas:write')

  const body = await readBody(event)
  const auth = event.context.auth

  if (!body.name || !body.scope) {
    throw createError({
      statusCode: 400,
      message: 'Name and scope are required'
    })
  }

  // Validate scopeId is provided for district/school scopes
  if ((body.scope === 'district' || body.scope === 'school') && !body.scopeId) {
    throw createError({
      statusCode: 400,
      message: 'scopeId is required for district and school scopes'
    })
  }

  // Validate fields array
  if (!Array.isArray(body.fields) || body.fields.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Fields array is required and must not be empty'
    })
  }

  // Validate each field has required properties
  for (const field of body.fields) {
    if (!field.id || !field.type || !field.label) {
      throw createError({
        statusCode: 400,
        message: 'Each field must have id, type, and label'
      })
    }
  }

  const schema = await FormSchema.create({
    name: body.name,
    description: body.description,
    version: body.version || '1.0.0',
    scope: body.scope,
    scopeId: body.scopeId,
    fields: body.fields,
    isActive: body.isActive !== undefined ? body.isActive : true,
    createdBy: auth?.userId
  })

  // Log audit entry
  await logAuditEntry({
    actorId: auth?.userId!,
    actorEmail: auth?.email,
    action: 'create',
    resourceType: 'form_schema',
    resourceId: schema._id.toString(),
    details: { name: schema.name, scope: schema.scope }
  })

  return schema
})
