<script setup lang="ts">
definePageMeta({ layout: 'default' })

const ROLES = [
  { label: 'Parent', value: 'parent' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'School Admin', value: 'school_admin' },
  { label: 'District Admin', value: 'district_admin' },
  { label: 'County Admin', value: 'county_admin' },
  { label: 'Super Admin', value: 'super_admin' }
]

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'parent'
})

const loading = ref(false)
const error = ref('')

async function handleCreate() {
  if (!form.firstName || !form.email || !form.password) {
    error.value = 'First name, email, and password are required'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: form
    })
    await navigateTo('/admin/users')
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    error.value = e.data?.message ?? 'Failed to create user'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/admin/users">
        <UButton
          variant="ghost"
          icon="i-heroicons-arrow-left"
          size="sm"
        >
          Back to users
        </UButton>
      </NuxtLink>
    </div>

    <div>
      <h2 class="text-2xl font-bold text-foreground">
        Create User
      </h2>
      <p class="text-sm text-muted-foreground mt-1">
        Add a new user to the system
      </p>
    </div>

    <UCard>
      <form
        class="space-y-4"
        @submit.prevent="handleCreate"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField
            label="First name"
            required
          >
            <UInput
              v-model="form.firstName"
              placeholder="Jane"
            />
          </UFormField>
          <UFormField label="Last name">
            <UInput
              v-model="form.lastName"
              placeholder="Smith"
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
            placeholder="jane@example.com"
          />
        </UFormField>

        <UFormField
          label="Password"
          required
        >
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Temporary password"
          />
        </UFormField>

        <UFormField label="Role">
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

        <div class="flex gap-3 pt-2">
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
          >
            Create user
          </UButton>
          <NuxtLink to="/admin/users">
            <UButton
              variant="outline"
              color="neutral"
            >
              Cancel
            </UButton>
          </NuxtLink>
        </div>
      </form>
    </UCard>
  </div>
</template>
