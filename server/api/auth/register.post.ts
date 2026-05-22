import User from '../../models/User'
import { hashPassword } from '../../utils/password'
import { generateToken } from '../../utils/jwt'
import { getPermissionsForRole } from '../../utils/permissions'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, firstName, lastName, role } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format'
      })
    }

    // Validate password strength
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'Password must be at least 8 characters'
      })
    }

    // Validate role
    const validRoles = ['super_admin', 'county_admin', 'district_admin', 'school_admin', 'teacher', 'parent']
    if (!validRoles.includes(role)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid role'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'User with this email already exists'
      })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      role,
      permissions: getPermissionsForRole(role),
      isActive: true
    })

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })

    // Return user data without password
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
    }
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Failed to register user'
    })
  }
})
