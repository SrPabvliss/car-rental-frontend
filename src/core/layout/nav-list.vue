<script lang="ts" setup>
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

export interface LinkProp {
  title: string
  label?: string
  icon: string
  variant: 'default' | 'ghost'
  href?: string
}

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
  onNavigate?: () => void
}

const props = defineProps<NavProps>()

const route = useRoute()

const determineActiveLink = (link?: string) => {
  if (!link) return false
  const currentModule = route.path.split('/').pop()
  return currentModule && currentModule.toUpperCase() === link.toUpperCase()
}

const handleNavigation = (href?: string) => {
  if (href) {
    router.push({ name: href })
    props.onNavigate?.()
  }
}
</script>

<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <nav
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <template v-for="(link, index) in links">
        <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
          <TooltipTrigger as-child>
            <a
              :class="
                cn(
                  buttonVariants({
                    variant: determineActiveLink(link.href)
                      ? 'default'
                      : 'ghost',
                    size: 'icon',
                  }),
                  'h-9 w-9',

                  determineActiveLink(link.href)
                    ? 'text-white dark:bg-muted dark:hover:bg-muted dark:hover:text-white'
                    : 'dark:bg-muted dark:text-muted-foreground',
                )
              "
              @click.prevent="link.href && handleNavigation(link.href)"
            >
              <Icon :icon="link.icon" class="size-4" />
              <span class="sr-only">{{ link.title }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
            <span v-if="link.label" class="ml-auto text-muted-foreground">
              {{ link.label }}
            </span>
          </TooltipContent>
        </Tooltip>

        <a
          v-else
          :key="`2-${index}`"
          href="#"
          :class="
            cn(
              buttonVariants({
                variant: determineActiveLink(link.href) ? 'default' : 'ghost',
                size: 'sm',
              }),
              link.variant === 'default' &&
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start',
              determineActiveLink(link.href) ? 'text-white' : '',
            )
          "
          @click.prevent="link.href && handleNavigation(link.href)"
        >
          <Icon :icon="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span
            v-if="link.label"
            :class="
              cn(
                'ml-auto',
                link.variant === 'default' && 'text-background dark:text-white',
              )
            "
          >
            {{ link.label }}
          </span>
        </a>
      </template>
    </nav>
  </div>
</template>
