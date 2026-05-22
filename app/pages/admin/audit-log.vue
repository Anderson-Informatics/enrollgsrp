<script setup lang="ts">
definePageMeta({ layout: 'default' })

const $api = useApi()

interface AuditEntry {
  _id: string
  actorId: string
  actorEmail?: string
  action: string
  resourceType: string
  resourceId?: string
  details?: Record<string, unknown>
  createdAt: string
}

const page = ref(1)
const limit = 20
const resourceTypeFilter = ref<string | null>(null)

const RESOURCE_TYPES = [
  { label: 'All types', value: null },
  { label: 'Permission', value: 'permission' },
  { label: 'User', value: 'user' },
  { label: 'Application', value: 'application' }
]

const { data, pending, refresh } = useAsyncData(
  () => `audit-log-${page.value}-${resourceTypeFilter.value}`,
  () => {
    const params = new URLSearchParams()
    if (resourceTypeFilter.value) params.set('resourceType', resourceTypeFilter.value)
    params.set('page', String(page.value))
    params.set('limit', String(limit))
    return $api<{ logs: AuditEntry[], total: number }>(`/api/admin/audit-log?${params.toString()}`)
  },
  { watch: [page, resourceTypeFilter] }
)

watch(resourceTypeFilter, () => {
  page.value = 1
})

const logs = computed(() => (data.value as { logs?: AuditEntry[] } | null)?.logs ?? [])
const total = computed(() => (data.value as { total?: number } | null)?.total ?? 0)
const totalPages = computed(() => Math.ceil(total.value / limit))

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-foreground">
          Audit Log
        </h2>
        <p class="text-sm text-muted-foreground mt-1">
          Permission changes and admin actions
        </p>
      </div>
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-heroicons-arrow-path"
        :loading="pending"
        @click="() => refresh()"
      />
    </div>

    <!-- Filter -->
    <div class="flex gap-3">
      <USelect
        v-model="resourceTypeFilter"
        :items="RESOURCE_TYPES"
        class="w-48"
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
        v-else-if="logs.length === 0"
        class="text-center py-12 text-muted-foreground"
      >
        No audit log entries found
      </div>

      <div
        v-else
        class="overflow-x-auto"
      >
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border text-left">
              <th class="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                Timestamp
              </th>
              <th class="pb-3 pr-4 font-medium text-muted-foreground">
                Actor
              </th>
              <th class="pb-3 pr-4 font-medium text-muted-foreground">
                Action
              </th>
              <th class="pb-3 pr-4 font-medium text-muted-foreground">
                Resource
              </th>
              <th class="pb-3 font-medium text-muted-foreground">
                Details
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr
              v-for="entry in logs"
              :key="entry._id"
              class="hover:bg-muted/40 transition-colors"
            >
              <td class="py-3 pr-4 text-muted-foreground text-xs whitespace-nowrap">
                {{ formatDate(entry.createdAt) }}
              </td>
              <td class="py-3 pr-4 font-medium">
                {{ entry.actorEmail ?? entry.actorId }}
              </td>
              <td class="py-3 pr-4">
                <UBadge
                  variant="subtle"
                  color="info"
                  size="sm"
                >
                  {{ entry.action }}
                </UBadge>
              </td>
              <td class="py-3 pr-4 text-muted-foreground">
                {{ entry.resourceType }}
                <span
                  v-if="entry.resourceId"
                  class="font-mono text-xs ml-1"
                >{{ entry.resourceId }}</span>
              </td>
              <td class="py-3 text-xs text-muted-foreground font-mono max-w-xs truncate">
                <span v-if="entry.details">{{ JSON.stringify(entry.details) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between pt-4 border-t border-border mt-4"
      >
        <p class="text-sm text-muted-foreground">
          {{ total }} entries total
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
