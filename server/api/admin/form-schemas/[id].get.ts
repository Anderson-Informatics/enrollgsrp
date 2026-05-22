import FormSchema from '../../../models/FormSchema'
import { requirePermission } from '../../../utils/require-permission'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'form_schemas:read')

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Form schema ID is required'
    })
  }

  const schema = await FormSchema.findById(id)
    .populate('createdBy', 'firstName lastName email')
    .lean()

  if (!schema) {
    throw createError({
      statusCode: 404,
      message: 'Form schema not found'
    })
  }

  return schema
})
