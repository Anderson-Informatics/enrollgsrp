import PermissionModel from '../../models/Permission'
import { requirePermission } from '../../utils/require-permission'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'permissions:manage')

  const permissions = await PermissionModel.find({})
    .select('code name description category')
    .sort({ category: 1, code: 1 })
    .lean()

  return { permissions }
})
