import User from '../../../models/User'
import { requirePermission } from '../../../utils/require-permission'
import { getPermissionsForRole } from '../../../utils/permissions'

const VALID_ROLES = ['super_admin', 'county_admin', 'district_admin', 'school_admin', 'teacher', 'parent']

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'users:write')

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { role, isActive, firstName, lastName } = body

  if (role !== undefined && !VALID_ROLES.includes(role)) {
    throw createError({ statusCode: 400, message: 'Invalid role' })
  }

  const user = await User.findById(id)
  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  if (role !== undefined && role !== user.role) {
    user.role = role
    user.permissions = getPermissionsForRole(role)
  }
  if (isActive !== undefined) user.isActive = isActive
  if (firstName !== undefined) user.firstName = firstName
  if (lastName !== undefined) user.lastName = lastName

  await user.save()

  const updated = await User.findById(id).select('-passwordHash').lean()
  return { user: updated }
})
