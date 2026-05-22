import { f as defineEventHandler, M as requirePermission, w as getRouterParam, U as UserModel, d as createError } from '../../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  await requirePermission(event, "users:read");
  const id = getRouterParam(event, "id");
  const user = await UserModel.findById(id).select("-passwordHash").lean();
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }
  return { user };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
