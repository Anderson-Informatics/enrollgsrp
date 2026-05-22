import { f as defineEventHandler } from '../../nitro/nitro.mjs';
import mongoose from 'mongoose';
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

const STATE_LABELS = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting"
};
const health_get = defineEventHandler(() => {
  var _a;
  return {
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    mongodb: (_a = STATE_LABELS[mongoose.connection.readyState]) != null ? _a : "unknown"
  };
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
