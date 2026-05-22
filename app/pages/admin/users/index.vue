<script setup lang="ts">
definePageMeta({ layout: 'default' })

const $api = useApi()

interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: string
  isActive: boolean
  createdAt: string
}

const ROLES = [
  { label: 'All roles', value: 'all' },
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'County Admin', value: 'county_admin' },
  { label: 'District Admin', value: 'district_admin' },
  { label: 'School Admin', value: 'school_admin' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Parent', value: 'parent' }
]

const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  county_admin: 'County Admin',
  district_admin: 'District Admin',
  school_admin: 'School Admin',
  teacher: 'Teacher',
  parent: 'Parent'
}

const search = ref('')
const selectedRole = ref('all')
const page = ref(1)
const limit = 20

const debouncedSearch = ref('')
let debounceTimer: ReturnType<typeof setTimeout>
watch(search, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(
    () => {
      debouncedSearch.value = val
      page.value = 1
    },
    300
  )
})

watch(selectedRole, () => {
  page.value = 1
})

const { data, pending } = useAsyncData(
  'admin-users',
  () => {
    const params = new URLSearchParams()
    if (debouncedSearch.value) params.set('search', debouncedSearch.value)
    if (selectedRole.value && selectedRole.value !== 'all') params.set('role', selectedRole.value)
    params.set('page', String(page.value))
    params.set('limit', String(limit))
    return $api<{ users: User[], total: number, page: number, limit: number }>(
      `/api/admin/users?${params.toString()}`
    )
  },
  { watch: [debouncedSearch, selectedRole, page] }
)

const users = computed(() => data.value?.users ?? [])
const total = computed(() => data.value?.total ?? 0)
const totalPages = computed(() => Math.ceil(total.value / limit))

function roleLabel(role: string) {
  return ROLE_LABELS[role] ?? role
}

function roleBadgeColor(role: string): 'error' | 'warning' | 'info' | 'success' | 'neutral' {
  const map: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
    super_admin: 'error',
    county_admin: 'warning',
    district_admin: 'warning',
    school_admin: 'info',
    teacher: 'success',
    parent: 'neutral'
  }
  return map[role] ?? 'neutral'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-foreground">
          Users
        </h2>
        <p class="text-sm text-muted-foreground mt-1">
          Manage user accounts and roles
        </p>
      </div>
      <UButton
        to="/admin/users/create"
        color="primary"
        icon="i-heroicons-plus"
        size="sm"
      >
        Create user
      </UButton>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-3">
      <UInput
        v-model="search"
        placeholder="Search by name or email…"
        icon="i-heroicons-magnifying-glass"
        class="sm:w-72"
      />
      <USelect
        v-model="selectedRole"
        :items="ROLES"
        class="sm:w-48"
      />
    </div>

    <!-- Table -->
    <UCard>
      <div
        v-if="pending"
        class="flex items-center justify-center py-12"
      >
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-6 h-6 animate-spin text-muted-foreground"
        />
      </div>

      <div
        v-else-if="users.length === 0"
        class="text-center py-12 text-muted-foreground"
      >
        No users found
      </div>

      <table
        v-else
        class="w-full text-sm"
      >
        <thead>
          <tr class="border-b border-border text-left">
            <th class="pb-3 pr-4 font-medium text-muted-foreground">
              Name
            </th>
            <th class="pb-3 pr-4 font-medium text-muted-foreground">
              Email
            </th>
            <th class="pb-3 pr-4 font-medium text-muted-foreground">
              Role
            </th>
            <th class="pb-3 pr-4 font-medium text-muted-foreground">
              Status
            </th>
            <th class="pb-3 font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr
            v-for="user in users"
            :key="user._id"
            class="hover:bg-muted/40 transition-colors"
          >
            <td class="py-3 pr-4 font-medium">
              {{ user.firstName }} {{ user.lastName }}
            </td>
            <td class="py-3 pr-4 text-muted-foreground">
              {{ user.email }}
            </td>
            <td class="py-3 pr-4">
              <UBadge
                :color="roleBadgeColor(user.role)"
                variant="subtle"
                size="sm"
              >
                {{ roleLabel(user.role) }}
              </UBadge>
            </td>
            <td class="py-3 pr-4">
              <UBadge
                :color="user.isActive ? 'success' : 'neutral'"
                variant="subtle"
                size="sm"
              >
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </UBadge>
            </td>
            <td class="py-3">
              <UButton
                :to="`/admin/users/${user._id}`"
                size="xs"
                variant="ghost"
                icon="i-heroicons-pencil-square"
              >
                Edit
              </UButton>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between pt-4 border-t border-border mt-4"
      >
        <p class="text-sm text-muted-foreground">
          {{ total }} users total
        </p>
        <div class="flex gap-2">
          <UButton
            size="sm"
            variant="outline"
            :disabled="page <= 1"
            icon="i-heroicons-chevron-left"
            @click="page--"
          />
          <span class="text-sm flex items-center px-2">{{ page }} / {{ totalPages }}</span>
          <UButton
            size="sm"
            variant="outline"
            :disabled="page >= totalPages"
            icon="i-heroicons-chevron-right"
            @click="page++"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
