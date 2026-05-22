import { f as defineEventHandler, M as requirePermission, w as getRouterParam, d as createError, F as FormSchema, G as logAuditEntry } from '../../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  await requirePermission(event, "form_schemas:delete");
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Form schema ID is required"
    });
  }
  const existing = await FormSchema.findById(id);
  if (!existing) {
    throw createError({
      statusCode: 404,
      message: "Form schema not found"
    });
  }
  await FormSchema.findByIdAndDelete(id);
  const auth = event.context.auth;
  await logAuditEntry({
    actorId: auth == null ? void 0 : auth.userId,
    actorEmail: auth == null ? void 0 : auth.email,
    action: "delete",
    resourceType: "form_schema",
    resourceId: id,
    details: { name: existing.name }
  });
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
