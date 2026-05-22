import { f as defineEventHandler, M as requirePermission, w as getRouterParam, L as readBody, d as createError, U as UserModel, H as logPermissionChange, P as PERMISSION_CODES } from '../../../../../nitro/nitro.mjs';
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

const VALID_CODES = new Set(PERMISSION_CODES);
const permissions_patch = defineEventHandler(async (event) => {
  var _a, _b;
  await requirePermission(event, "permissions:manage");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const grant = (_a = body.grant) != null ? _a : [];
  const revoke = (_b = body.revoke) != null ? _b : [];
  const unknownCodes = [...grant, ...revoke].filter((c) => !VALID_CODES.has(c));
  if (unknownCodes.length > 0) {
    throw createError({
      statusCode: 400,
      message: `Unknown permission codes: ${unknownCodes.join(", ")}`
    });
  }
  const user = await UserModel.findById(id);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }
  const before = new Set(user.permissions);
  const after = new Set(user.permissions);
  grant.forEach((c) => after.add(c));
  revoke.forEach((c) => after.delete(c));
  const added = grant.filter((c) => !before.has(c));
  const removed = revoke.filter((c) => before.has(c));
  user.permissions = [...after];
  await user.save();
  await logPermissionChange(event, {
    targetUserId: id,
    added,
    removed
  });
  const updated = await UserModel.findById(id).select("-passwordHash").lean();
  return { user: updated };
});

export { permissions_patch as default };
//# sourceMappingURL=permissions.patch.mjs.map
