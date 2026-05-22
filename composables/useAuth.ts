import type { AuthUser } from '../types/auth'

export type { AuthUser }

export function useAuth() {
  const token = useCookie<string | null>('auth_token')
  const userCookie = useCookie<AuthUser | null>('auth_user_info', { default: () => null })
  const user = useState<AuthUser | null>('auth_user', () => userCookie.value)

  const login = async (email: string, password: string) => {
    const response = await $fetch<{ success: boolean, token: string, user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })

    if (response.success) {
      token.value = response.token
      user.value = response.user
      userCookie.value = response.user
    }

    return response
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
  }) => {
    const response = await $fetch<{ success: boolean, token: string, user: AuthUser }>('/api/auth/register', {
      method: 'POST',
      body: userData
    })

    if (response.success) {
      token.value = response.token
      user.value = response.user
      userCookie.value = response.user
    }

    return response
  }

  const logout = () => {
    token.value = null
    user.value = null
    userCookie.value = null
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    token,
    user,
    login,
    register,
    logout,
    isAuthenticated
  }
}
