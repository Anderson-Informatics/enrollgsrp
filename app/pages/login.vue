<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password'
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await login(email.value, password.value)
    if (res.success) {
      await navigateTo('/')
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    error.value = e.data?.message ?? 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-sm">
    <template #header>
      <div class="text-center py-2">
        <h1 class="text-2xl font-bold text-primary mb-1">
          EnrollGSRP
        </h1>
        <p class="text-sm text-muted-foreground">
          Sign in to your account
        </p>
      </div>
    </template>

    <form
      class="space-y-4"
      @submit.prevent="handleLogin"
    >
      <UFormField label="Email">
        <UInput
          v-model="email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          required
        />
      </UFormField>

      <UFormField label="Password">
        <UInput
          v-model="password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          required
        />
      </UFormField>

      <div
        v-if="error"
        class="text-sm text-red-500"
      >
        {{ error }}
      </div>

      <UButton
        type="submit"
        color="primary"
        block
        :loading="loading"
      >
        Sign in
      </UButton>
    </form>

    <template #footer>
      <p class="text-sm text-center text-muted-foreground">
        Don't have an account?
        <NuxtLink
          to="/register"
          class="text-primary font-medium hover:underline"
        >
          Register
        </NuxtLink>
      </p>
    </template>
  </UCard>
</template>
