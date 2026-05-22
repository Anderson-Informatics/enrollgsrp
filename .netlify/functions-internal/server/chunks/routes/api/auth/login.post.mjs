import { f as defineEventHandler, L as readBody, d as createError, U as UserModel, S as verifyPassword, n as generateToken } from '../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Email and password are required"
      });
    }
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }
    if (!user.isActive) {
      throw createError({
        statusCode: 403,
        message: "Account is deactivated"
      });
    }
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }
    user.lastLoginAt = /* @__PURE__ */ new Date();
    await user.save();
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
    return {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        permissions: user.permissions,
        districtId: user.districtId,
        schoolId: user.schoolId,
        isActive: user.isActive
      }
    };
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to login"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
