import { f as defineEventHandler, M as requirePermission, w as getRouterParam, d as createError, F as FormSchema } from '../../../../nitro/nitro.mjs';
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
  await requirePermission(event, "form_schemas:read");
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Form schema ID is required"
    });
  }
  const schema = await FormSchema.findById(id).populate("createdBy", "firstName lastName email").lean();
  if (!schema) {
    throw createError({
      statusCode: 404,
      message: "Form schema not found"
    });
  }
  return schema;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
