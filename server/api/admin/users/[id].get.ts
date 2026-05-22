import User from '../../../models/User'
import { requirePermission } from '../../../utils/require-permission'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'users:read')

  const id = getRouterParam(event, 'id')

  const user = await User.findById(id)
    .select('-passwordHash')
    .lean()

  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  return { user }
})
