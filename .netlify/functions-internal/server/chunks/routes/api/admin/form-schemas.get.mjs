import { f as defineEventHandler, M as requirePermission, r as getQuery, F as FormSchema } from '../../../nitro/nitro.mjs';
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

const formSchemas_get = defineEventHandler(async (event) => {
  await requirePermission(event, "form_schemas:read");
  const query = getQuery(event);
  const scope = query.scope;
  const scopeId = query.scopeId;
  const isActive = query.isActive;
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  const filter = {};
  if (scope) filter.scope = scope;
  if (scopeId) filter.scopeId = scopeId;
  if (isActive !== void 0) filter.isActive = isActive === "true";
  const [schemas, total] = await Promise.all([
    FormSchema.find(filter).populate("createdBy", "firstName lastName email").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    FormSchema.countDocuments(filter)
  ]);
  return { schemas, total, page, limit };
});

export { formSchemas_get as default };
//# sourceMappingURL=form-schemas.get.mjs.map
