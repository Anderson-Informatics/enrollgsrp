<script setup lang="ts">
definePageMeta({ layout: 'default' })

const $api = useApi()
const route = useRoute()
const userId = route.params.id as string

interface UserDetail {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: string
  isActive: boolean
  permissions: string[]
  createdAt: string
}

interface PermissionItem {
  code: string
  name: string
  category: string
}

const ALL_ROLES = [
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'County Admin', value: 'county_admin' },
  { label: 'District Admin', value: 'district_admin' },
  { label: 'School Admin', value: 'school_admin' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Parent', value: 'parent' }
]

const ADMIN_ROLES = ['super_admin', 'county_admin', 'district_admin', 'school_admin']

const { data: userData, refresh: refreshUser } = useAsyncData(
  `user-${userId}`,
  () => $api<{ user: UserDetail }>(`/api/admin/users/${userId}`)
)

const { data: permCatalog } = useAsyncData(
  'permission-catalog',
  () => $api<{ permissions: PermissionItem[] }>('/api/admin/permissions')
)

const user = computed(() => userData.value?.user)
const allPermissions = computed(() => permCatalog.value?.permissions ?? [])

const permissionsByCategory = computed(() => {
  const map: Record<string, PermissionItem[]> = {}
  for (const p of allPermissions.value) {
    if (!map[p.category]) map[p.category] = []
    ;(map[p.category] as PermissionItem[]).push(p)
  }
  return map
})

const editedRole = ref('')
const editedIsActive = ref(true)
const saving = ref(false)
const saveError = ref('')
const saveSuccess = ref('')

watch(user, (u) => {
  if (u) {
    editedRole.value = u.role
    editedIsActive.value = u.isActive
  }
}, { immediate: true })

async function saveProfile() {
  saving.value = true
  saveError.value = ''
  saveSuccess.value = ''
  try {
    await $api(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      body: { role: editedRole.value, isActive: editedIsActive.value }
    })
    await refreshUser()
    saveSuccess.value = 'Profile saved'
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    saveError.value = e.data?.message ?? 'Failed to save'
  } finally {
    saving.value = false
  }
}

function userHasPermission(code: string) {
  return user.value?.permissions.includes(code) ?? false
}

const permSaving = ref(false)
const permError = ref('')
const permSuccess = ref('')

async function togglePermission(code: string) {
  if (!user.value) return
  permSaving.value = true
  permError.value = ''
  permSuccess.value = ''
  const has = userHasPermission(code)
  try {
    await $api(`/api/admin/users/${userId}/permissions`, {
      method: 'PATCH',
      body: has ? { revoke: [code] } : { grant: [code] }
    })
    await refreshUser()
    permSuccess.value = `Permission ${has ? 'revoked' : 'granted'}`
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    permError.value = e.data?.message ?? 'Failed to update permission'
  } finally {
    permSaving.value = false
  }
}

const savedRoleIsParent = computed(() => user.value?.role === 'parent')

const availableRoles = computed(() =>
  savedRoleIsParent.value
    ? ALL_ROLES.filter(r => r.value === 'parent')
    : ALL_ROLES.filter(r => r.value !== 'parent')
)

const showPermissions = computed(() => ADMIN_ROLES.includes(editedRole.value))

function categoryLabel(cat: string) {
  return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ')
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div class="flex items-center gap-3">
      <UButton
        to="/admin/users"
        variant="ghost"
        icon="i-heroicons-arrow-left"
        size="sm"
      >
        Back to users
      </UButton>
    </div>

    <div
      v-if="!user"
      class="flex items-center justify-center py-12"
    >
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-6 h-6 animate-spin text-muted-foreground"
      />
    </div>

    <template v-else>
      <!-- Profile card -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            {{ user.firstName }} {{ user.lastName }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ user.email }}
          </p>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Role</label>
              <USelect
                v-model="editedRole"
                :items="availableRoles"
                :disabled="savedRoleIsParent"
              />
              <p
                v-if="savedRoleIsParent"
                class="text-xs text-muted-foreground mt-1"
              >
                Parent role cannot be changed.
              </p>
            </div>
            <div class="flex items-end gap-3">
              <label class="block text-sm font-medium mb-2">Active account</label>
              <USwitch v-model="editedIsActive" />
            </div>
          </div>

          <div
            v-if="saveError"
            class="text-sm text-red-500"
          >
            {{ saveError }}
          </div>
          <div
            v-if="saveSuccess"
            class="text-sm text-green-600"
          >
            {{ saveSuccess }}
          </div>
        </div>

        <template #footer>
          <UButton
            color="primary"
            :loading="saving"
            @click="saveProfile"
          >
            Save profile
          </UButton>
        </template>
      </UCard>

      <!-- Permissions card — admin roles only -->
      <UCard v-if="showPermissions">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              Permissions
            </h3>
            <span class="text-sm text-muted-foreground">
              {{ user.permissions.length }} active
            </span>
          </div>
          <p class="text-sm text-muted-foreground mt-1">
            Custom permission overrides — changes take effect immediately.
          </p>
        </template>

        <div
          v-if="permError"
          class="mb-4 text-sm text-red-500"
        >
          {{ permError }}
        </div>
        <div
          v-if="permSuccess"
          class="mb-4 text-sm text-green-600"
        >
          {{ permSuccess }}
        </div>

        <div
          v-if="allPermissions.length === 0"
          class="text-sm text-muted-foreground py-4"
        >
          Loading permission catalog…
        </div>

        <div
          v-else
          class="space-y-6"
        >
          <div
            v-for="(perms, category) in permissionsByCategory"
            :key="category"
          >
            <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {{ categoryLabel(String(category)) }}
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label
                v-for="perm in perms"
                :key="perm.code"
                class="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted/40 transition-colors"
                :class="{ 'opacity-50': permSaving }"
              >
                <input
                  type="checkbox"
                  class="rounded border-border accent-primary"
                  :checked="userHasPermission(perm.code)"
                  :disabled="permSaving"
                  @change="togglePermission(perm.code)"
                >
                <div>
                  <p class="text-sm font-medium">
                    {{ perm.name }}
                  </p>
                  <p class="text-xs text-muted-foreground font-mono">
                    {{ perm.code }}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </UCard>
    </template>
  </div>
</template>
