<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DashboardLayout from './layout-view.vue'

const route = useRoute()
const layout = computed(() => {
  return route.meta.layout === 'dashboard' ? DashboardLayout : DashboardLayout
})
</script>
