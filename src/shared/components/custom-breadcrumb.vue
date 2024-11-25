<!-- Reutitlizable -->

<script setup lang="ts">
import router from '@/router'
import { ChevronRight } from 'lucide-vue-next'
import type { Component } from 'vue'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbItem {
  label: string
  href: string
  icon?: Component
  current?: boolean
}

defineProps<{
  items: BreadcrumbItem[]
}>()

const handleNavigaion = (href: string, current?: boolean) => {
  if (current) return

  router.push({
    name: href,
    params: { role: router.currentRoute.value.params.role },
  })
}
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem v-for="(item, index) in items" :key="item.href">
        <BreadcrumbLink
          :class="[
            'flex items-center gap-2',
            item.current ? 'cursor-default' : 'hover:underline',
          ]"
          @click="handleNavigaion(item.href, item.current)"
        >
          <component :is="item.icon" v-if="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </BreadcrumbLink>
        <BreadcrumbSeparator v-if="index < items.length - 1">
          <ChevronRight class="h-4 w-4" />
        </BreadcrumbSeparator>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
