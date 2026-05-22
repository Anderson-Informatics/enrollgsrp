import { f as defineEventHandler, M as requirePermission, w as getRouterParam, d as createError, L as readBody, F as FormSchema, G as logAuditEntry } from '../../../../nitro/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  await requirePermission(event, "form_schemas:write");
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Form schema ID is required"
    });
  }
  const body = await readBody(event);
  const auth = event.context.auth;
  const existing = await FormSchema.findById(id);
  if (!existing) {
    throw createError({
      statusCode: 404,
      message: "Form schema not found"
    });
  }
  const updates = {};
  if (body.name !== void 0) updates.name = body.name;
  if (body.description !== void 0) updates.description = body.description;
  if (body.version !== void 0) updates.version = body.version;
  if (body.scope !== void 0) updates.scope = body.scope;
  if (body.scopeId !== void 0) updates.scopeId = body.scopeId;
  if (body.fields !== void 0) {
    if (!Array.isArray(body.fields) || body.fields.length === 0) {
      throw createError({
        statusCode: 400,
        message: "Fields array must not be empty"
      });
    }
    for (const field of body.fields) {
      if (!field.id || !field.type || !field.label) {
        throw createError({
          statusCode: 400,
          message: "Each field must have id, type, and label"
        });
      }
    }
    updates.fields = body.fields;
  }
  if (body.isActive !== void 0) updates.isActive = body.isActive;
  const updated = await FormSchema.findByIdAndUpdate(id, { $set: updates }, { new: true }).populate("createdBy", "firstName lastName email").lean();
  await logAuditEntry({
    actorId: auth == null ? void 0 : auth.userId,
    actorEmail: auth == null ? void 0 : auth.email,
    action: "update",
    resourceType: "form_schema",
    resourceId: id,
    details: { changes: Object.keys(updates) }
  });
  return updated;
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
