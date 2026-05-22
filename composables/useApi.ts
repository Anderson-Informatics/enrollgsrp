export function useApi() {
  const { token } = useAuth()

  return $fetch.create({
    onRequest({ options }) {
      if (token.value) {
        const headers = new Headers(options.headers as HeadersInit)
        headers.set('Authorization', `Bearer ${token.value}`)
        options.headers = headers
      }
    }
  })
}
