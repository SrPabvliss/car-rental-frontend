<script setup lang="ts">
import { cn } from '@/lib/utils'
import { DoubleArrowRightIcon } from '@radix-icons/vue'
import { PaginationLast, type PaginationLastProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

import {
  Button,
} from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <Button :class="cn('w-9 h-9 p-0', props.class)" variant="outline">
      <slot>
        <DoubleArrowRightIcon />
      </slot>
    </Button>
  </PaginationLast>
</template>
