import { f as defineEventHandler, M as requirePermission, r as getQuery, U as UserModel } from '../../../nitro/nitro.mjs';
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

const users_get = defineEventHandler(async (event) => {
  await requirePermission(event, "users:read");
  const query = getQuery(event);
  const search = query.search;
  const role = query.role;
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  const filter = {};
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      { email: { $regex: search, $options: "i" } },
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } }
    ];
  }
  const [users, total] = await Promise.all([
    UserModel.find(filter).select("email firstName lastName role isActive lastLoginAt createdAt").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    UserModel.countDocuments(filter)
  ]);
  return { users, total, page, limit };
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
