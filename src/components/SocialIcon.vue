<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg v-if="name === 'Instagram'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.75" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.75" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
  </svg>
  <svg v-else-if="name === 'Facebook'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75" />
    <path d="M13 21v-7.5h2.5l.4-2.8H13V9.2c0-.9.4-1.5 1.5-1.5H16V5.2c-.4-.1-1.2-.2-2-.2-2.2 0-3.7 1.3-3.7 3.8v1.900H8v2.8h2.3V21" fill="currentColor" />
  </svg>
</template>
