<script setup lang="ts">
import type { AuthUser } from '../../types/auth'

const isMobileMenuOpen = ref(false)
const { user, logout } = useAuth()
const router = useRouter()
const route = useRoute()

const mainNavigation = [
  { name: 'Dashboard', to: '/', icon: 'i-heroicons-home' },
  { name: 'Applications', to: '/applications', icon: 'i-heroicons-document-text' },
  { name: 'Students', to: '/students', icon: 'i-heroicons-academic-cap' },
  { name: 'Communications', to: '/communications', icon: 'i-heroicons-chat-bubble-left-right' },
  { name: 'Reports', to: '/reports', icon: 'i-heroicons-chart-bar' },
  { name: 'Settings', to: '/settings', icon: 'i-heroicons-cog-6-tooth' }
]

const adminNavigation = [
  { name: 'Users', to: '/admin/users', icon: 'i-heroicons-shield-check' },
  { name: 'Audit Log', to: '/admin/audit-log', icon: 'i-heroicons-clipboard-document-list' }
]

const currentUser = computed(() => user.value as AuthUser | null)

const userPermissions = computed(() => currentUser.value?.permissions ?? [])
const isAdmin = computed(() =>
  userPermissions.value.includes('users:read') || userPermissions.value.includes('*')
)

const allNavItems = computed(() => [
  ...mainNavigation,
  ...(isAdmin.value ? adminNavigation : [])
])

const pageTitle = computed(() => {
  const match = allNavItems.value.find(item =>
    item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)
  )
  return match?.name ?? 'EnrollGSRP'
})

const userDisplayName = computed(() => {
  const u = currentUser.value
  if (!u) return ''
  return u.firstName ? `${u.firstName} ${u.lastName ?? ''}`.trim() : u.email
})

const userInitials = computed(() => {
  const u = currentUser.value
  if (!u?.firstName) return '?'
  return `${u.firstName[0]}${u.lastName?.[0] ?? ''}`.toUpperCase()
})

function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

async function handleLogout() {
  logout()
  await router.push('/login')
}
</script>

<template>
  <div>
    <!-- Mobile overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="isMobileMenuOpen = false"
    />

    <div class="flex min-h-screen bg-background">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed lg:static inset-y-0 left-0 z-50',
          'w-64 bg-card border-r border-border flex flex-col',
          'transform transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <!-- Logo -->
        <div class="p-6 border-b border-border shrink-0">
          <NuxtLink
            to="/"
            class="text-2xl font-bold text-primary"
            @click="isMobileMenuOpen = false"
          >
            EnrollGSRP
          </NuxtLink>
        </div>

        <!-- Nav -->
        <nav class="p-4 space-y-1 flex-1 overflow-y-auto">
          <NuxtLink
            v-for="item in mainNavigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="isActive(item.to) ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'"
            @click="isMobileMenuOpen = false"
          >
            <UIcon
              :name="item.icon"
              class="w-5 h-5 shrink-0"
            />
            {{ item.name }}
          </NuxtLink>

          <template v-if="isAdmin">
            <div class="pt-4 pb-1 px-3">
              <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Admin
              </p>
            </div>
            <NuxtLink
              v-for="item in adminNavigation"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="isActive(item.to) ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'"
              @click="isMobileMenuOpen = false"
            >
              <UIcon
                :name="item.icon"
                class="w-5 h-5 shrink-0"
              />
              {{ item.name }}
            </NuxtLink>
          </template>
        </nav>

        <!-- New Application CTA -->
        <div class="p-4 border-t border-border shrink-0">
          <UButton
            color="primary"
            variant="solid"
            icon="i-heroicons-plus"
            block
            size="md"
            disabled
          >
            New Application
          </UButton>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 flex flex-col min-h-0">
        <!-- Header -->
        <header class="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">
          <UButton
            icon="i-heroicons-bars-3"
            variant="ghost"
            color="neutral"
            class="lg:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />

          <h1 class="text-lg font-semibold text-foreground">
            {{ pageTitle }}
          </h1>

          <div class="flex items-center gap-3">
            <span class="hidden sm:block text-sm text-muted-foreground">{{ userDisplayName }}</span>
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary select-none">
              {{ userInitials }}
            </div>
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-heroicons-arrow-right-on-rectangle"
              size="sm"
              title="Sign out"
              @click="handleLogout"
            />
          </div>
        </header>

        <!-- Content -->
        <div class="flex-1 overflow-auto p-4 lg:p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
