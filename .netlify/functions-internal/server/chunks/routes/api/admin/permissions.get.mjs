import { f as defineEventHandler, M as requirePermission, a as PermissionModel } from '../../../nitro/nitro.mjs';
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

const permissions_get = defineEventHandler(async (event) => {
  await requirePermission(event, "permissions:manage");
  const permissions = await PermissionModel.find({}).select("code name description category").sort({ category: 1, code: 1 }).lean();
  return { permissions };
});

export { permissions_get as default };
//# sourceMappingURL=permissions.get.mjs.map
