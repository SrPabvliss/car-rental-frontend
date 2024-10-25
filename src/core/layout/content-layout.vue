<script setup lang="ts">
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { Separator } from '@/components/ui/separator'
import ModeToggle from './mode-toggle.vue'
import UserNav from './user-nav.vue'
import { useMobile } from '../composables/use-mobile'

defineProps<{
  title: string
}>()

const { isMobile } = useMobile()
</script>

<template>
  <div class="flex items-center py-2 px-4" :class="{ 'md:px-8': !isMobile }">
    <h1 class="text-xl font-bold">{{ title }}</h1>
    <div class="ml-auto flex items-center gap-4">
      <ModeToggle />
      <UserNav />
    </div>
  </div>
  <Separator />
  <ScrollArea
    class="flex"
    :class="isMobile ? 'h-[calc(100vh-8rem)]' : 'h-[calc(100vh-4rem)]'"
  >
    <div class="p-4 md:p-8 w-full">
      <slot name="content">
        <p>Content</p>
      </slot>
    </div>
  </ScrollArea>
</template>
