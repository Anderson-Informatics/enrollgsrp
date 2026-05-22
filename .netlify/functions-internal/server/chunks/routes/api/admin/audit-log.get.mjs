import { f as defineEventHandler, M as requirePermission, r as getQuery, A as AuditLogModel } from '../../../nitro/nitro.mjs';
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

const auditLog_get = defineEventHandler(async (event) => {
  await requirePermission(event, "audit_log:read");
  const query = getQuery(event);
  const resourceType = query.resourceType;
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 50));
  const filter = {};
  if (resourceType) filter.resourceType = resourceType;
  const [entries, total] = await Promise.all([
    AuditLogModel.find(filter).sort({ timestamp: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    AuditLogModel.countDocuments(filter)
  ]);
  return { entries, total, page, limit };
});

export { auditLog_get as default };
//# sourceMappingURL=audit-log.get.mjs.map
