import User from '../../../../models/User'
import { requirePermission } from '../../../../utils/require-permission'
import { PERMISSION_CODES } from '../../../../utils/permissions'
import { logPermissionChange } from '../../../../utils/audit-log'

const VALID_CODES = new Set<string>(PERMISSION_CODES)

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'permissions:manage')

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const grant: string[] = body.grant ?? []
  const revoke: string[] = body.revoke ?? []

  const unknownCodes = [...grant, ...revoke].filter(c => !VALID_CODES.has(c))
  if (unknownCodes.length > 0) {
    throw createError({
      statusCode: 400,
      message: `Unknown permission codes: ${unknownCodes.join(', ')}`
    })
  }

  const user = await User.findById(id)
  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  const before = new Set(user.permissions)
  const after = new Set(user.permissions)

  grant.forEach(c => after.add(c))
  revoke.forEach(c => after.delete(c))

  const added = grant.filter(c => !before.has(c))
  const removed = revoke.filter(c => before.has(c))

  user.permissions = [...after]
  await user.save()

  await logPermissionChange(event, {
    targetUserId: id!,
    added,
    removed
  })

  const updated = await User.findById(id).select('-passwordHash').lean()
  return { user: updated }
})
