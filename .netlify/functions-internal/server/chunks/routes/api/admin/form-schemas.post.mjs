import { f as defineEventHandler, M as requirePermission, L as readBody, d as createError, F as FormSchema, G as logAuditEntry } from '../../../nitro/nitro.mjs';
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

const formSchemas_post = defineEventHandler(async (event) => {
  await requirePermission(event, "form_schemas:write");
  const body = await readBody(event);
  const auth = event.context.auth;
  if (!body.name || !body.scope) {
    throw createError({
      statusCode: 400,
      message: "Name and scope are required"
    });
  }
  if ((body.scope === "district" || body.scope === "school") && !body.scopeId) {
    throw createError({
      statusCode: 400,
      message: "scopeId is required for district and school scopes"
    });
  }
  if (!Array.isArray(body.fields) || body.fields.length === 0) {
    throw createError({
      statusCode: 400,
      message: "Fields array is required and must not be empty"
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
  const schema = await FormSchema.create({
    name: body.name,
    description: body.description,
    version: body.version || "1.0.0",
    scope: body.scope,
    scopeId: body.scopeId,
    fields: body.fields,
    isActive: body.isActive !== void 0 ? body.isActive : true,
    createdBy: auth == null ? void 0 : auth.userId
  });
  await logAuditEntry({
    actorId: auth == null ? void 0 : auth.userId,
    actorEmail: auth == null ? void 0 : auth.email,
    action: "create",
    resourceType: "form_schema",
    resourceId: schema._id.toString(),
    details: { name: schema.name, scope: schema.scope }
  });
  return schema;
});

export { formSchemas_post as default };
//# sourceMappingURL=form-schemas.post.mjs.map
