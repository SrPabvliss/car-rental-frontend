<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()

const delayDuration = 100
</script>

<template>
  <TooltipProvider disableHoverableContent>
    <Tooltip :delayDuration="delayDuration">
      <TooltipTrigger asChild>
        <Button
          class="rounded-full w-8 h-8 bg-background mr-2"
          variant="outline"
          size="icon"
          @click="mode === 'dark' ? mode = 'light' : mode = 'dark'"
        >
          <SunIcon
            v-if="mode === 'dark'"
            class="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100"
          />
          <MoonIcon
            v-else
            class="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0"
          />
          <span class="sr-only">Switch Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Switch Theme</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
