export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  const publicRoutes = ['/login', '/register']

  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (isAuthenticated.value && publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})
