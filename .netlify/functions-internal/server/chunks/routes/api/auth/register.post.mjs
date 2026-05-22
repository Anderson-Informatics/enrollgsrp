import { f as defineEventHandler, L as readBody, d as createError, U as UserModel, z as hashPassword, q as getPermissionsForRole, n as generateToken } from '../../../nitro/nitro.mjs';
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

const register_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password, firstName, lastName, role } = body;
    if (!email || !password || !firstName || !lastName || !role) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields"
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email format"
      });
    }
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        message: "Password must be at least 8 characters"
      });
    }
    const validRoles = ["super_admin", "county_admin", "district_admin", "school_admin", "teacher", "parent"];
    if (!validRoles.includes(role)) {
      throw createError({
        statusCode: 400,
        message: "Invalid role"
      });
    }
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: "User with this email already exists"
      });
    }
    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      role,
      permissions: getPermissionsForRole(role),
      isActive: true
    });
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
        isActive: user.isActive
      }
    };
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to register user"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
