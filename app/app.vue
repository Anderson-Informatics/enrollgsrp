<script setup>
const isMobileMenuOpen = ref(false)

const navigation = [
  {
    name: 'Dashboard',
    to: '/',
    icon: 'i-heroicons-home'
  },
  {
    name: 'Applications',
    to: '/applications',
    icon: 'i-heroicons-document-text'
  },
  {
    name: 'Students',
    to: '/students',
    icon: 'i-heroicons-academic-cap'
  },
  {
    name: 'Communications',
    to: '/communications',
    icon: 'i-heroicons-chat-bubble-left-right'
  },
  {
    name: 'Reports',
    to: '/reports',
    icon: 'i-heroicons-chart-bar'
  },
  {
    name: 'Settings',
    to: '/settings',
    icon: 'i-heroicons-cog-6-tooth'
  }
]

const route = useRoute()
const pageTitle = computed(() => {
  const currentPage = navigation.find(item => item.to === route.path)
  return currentPage ? currentPage.name : 'EnrollGSRP'
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'EnrollGSRP - Wayne County PreK Enrollment System'
const description = 'Enrollment management system for Wayne County PreK programs'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <!-- Mobile menu overlay -->
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
          'w-64 bg-card border-r border-border',
          'transform transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <!-- Logo -->
        <div class="p-6 border-b border-border">
          <NuxtLink
            to="/"
            class="text-2xl font-bold text-primary"
            @click="isMobileMenuOpen = false"
          >
            EnrollGSRP
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="p-4 space-y-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="route.path === item.to
              ? 'bg-primary text-white'
              : 'text-foreground hover:bg-muted'"
            @click="isMobileMenuOpen = false"
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- New Suggestion Button -->
        <div class="p-4">
          <UButton
            color="primary"
            variant="solid"
            icon="i-heroicons-plus"
            block
            size="md"
          >
            New Suggestion
          </UButton>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col min-h-0">
        <!-- Header -->
        <header class="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <!-- Mobile menu toggle -->
          <UButton
            icon="i-heroicons-bars-3"
            variant="ghost"
            color="neutral"
            class="lg:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />

          <!-- Page Title -->
          <h1 class="text-lg font-semibold text-foreground">
            {{ pageTitle }}
          </h1>

          <!-- User Profile Placeholder -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <UIcon name="i-heroicons-user" class="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-auto p-4 lg:p-6">
          <NuxtPage />
        </div>
      </main>
    </div>
  </UApp>
</template>
