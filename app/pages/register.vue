<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { register } = useAuth()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'parent'
})

const ROLES = [
  { label: 'Parent / Guardian', value: 'parent' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'School Admin', value: 'school_admin' },
  { label: 'District Admin', value: 'district_admin' },
  { label: 'County Admin', value: 'county_admin' }
]

const loading = ref(false)
const error = ref('')

async function handleRegister() {
  if (!form.firstName || !form.email || !form.password) {
    error.value = 'First name, email, and password are required'
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await register(form)
    if (res.success) {
      await navigateTo('/')
    } else {
      error.value = 'Registration failed. Please try again.'
    }
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    error.value = e.data?.message ?? 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-md">
    <template #header>
      <div class="text-center py-2">
        <h1 class="text-2xl font-bold text-primary mb-1">
          EnrollGSRP
        </h1>
        <p class="text-sm text-muted-foreground">
          Create your account
        </p>
      </div>
    </template>

    <form
      class="space-y-4"
      @submit.prevent="handleRegister"
    >
      <div class="grid grid-cols-2 gap-3">
        <UFormField
          label="First name"
          required
        >
          <UInput
            v-model="form.firstName"
            placeholder="Jane"
            autocomplete="given-name"
          />
        </UFormField>
        <UFormField label="Last name">
          <UInput
            v-model="form.lastName"
            placeholder="Smith"
            autocomplete="family-name"
          />
        </UFormField>
      </div>

      <UFormField
        label="Email"
        required
      >
        <UInput
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
        />
      </UFormField>

      <UFormField
        label="Password"
        required
      >
        <UInput
          v-model="form.password"
          type="password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
        />
      </UFormField>

      <UFormField label="Account type">
        <USelect
          v-model="form.role"
          :items="ROLES"
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
        Create account
      </UButton>
    </form>

    <template #footer>
      <p class="text-sm text-center text-muted-foreground">
        Already have an account?
        <NuxtLink
          to="/login"
          class="text-primary font-medium hover:underline"
        >
          Sign in
        </NuxtLink>
      </p>
    </template>
  </UCard>
</template>
