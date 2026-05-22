import { f as defineEventHandler, M as requirePermission, w as getRouterParam, L as readBody, d as createError, U as UserModel, q as getPermissionsForRole } from '../../../../nitro/nitro.mjs';
import 'mongoose';
import 'bcrypt';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';

const VALID_ROLES = ["super_admin", "county_admin", "district_admin", "school_admin", "teacher", "parent"];
const _id__patch = defineEventHandler(async (event) => {
  await requirePermission(event, "users:write");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const { role, isActive, firstName, lastName } = body;
  if (role !== void 0 && !VALID_ROLES.includes(role)) {
    throw createError({ statusCode: 400, message: "Invalid role" });
  }
  const user = await UserModel.findById(id);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }
  if (role !== void 0 && role !== user.role) {
    user.role = role;
    user.permissions = getPermissionsForRole(role);
  }
  if (isActive !== void 0) user.isActive = isActive;
  if (firstName !== void 0) user.firstName = firstName;
  if (lastName !== void 0) user.lastName = lastName;
  await user.save();
  const updated = await UserModel.findById(id).select("-passwordHash").lean();
  return { user: updated };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
