import User from '../../models/User'
import { requirePermission } from '../../utils/require-permission'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'users:read')

  const query = getQuery(event)
  const search = query.search as string | undefined
  const role = query.role as string | undefined
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20))

  const filter: Record<string, unknown> = {}
  if (role) filter.role = role
  if (search) {
    filter.$or = [
      { email: { $regex: search, $options: 'i' } },
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } }
    ]
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .select('email firstName lastName role isActive lastLoginAt createdAt')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    User.countDocuments(filter)
  ])

  return { users, total, page, limit }
})
