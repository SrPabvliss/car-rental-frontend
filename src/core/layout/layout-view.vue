<script lang="ts" setup>
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ref, onMounted, onUnmounted } from 'vue'
import Nav from './nav-list.vue'
import Button from '@/components/ui/button/Button.vue'
import { Car, ChevronLeft, Menu } from 'lucide-vue-next'
import { useModulesStore } from '../context/modules-store'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

const props = withDefaults(
  defineProps<{
    defaultCollapsed?: boolean
    collapsedWidth?: number
    expandedWidth?: number
  }>(),
  {
    defaultCollapsed: false,
    collapsedWidth: 64,
    expandedWidth: 240,
  },
)

const isCollapsed = ref(props.defaultCollapsed)
const isMobile = ref(false)
const isMenuOpen = ref(false)
const store = useModulesStore()
store.loadModules()

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    isCollapsed.value = true
  }
}

onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile)
})

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div class="flex h-screen">
      <Button
        v-if="isMobile"
        variant="ghost"
        size="icon"
        class="fixed top-4 left-4 z-50 md:hidden"
        @click="isMenuOpen = true"
      >
        <Menu class="h-6 w-6" />
      </Button>

      <Sheet :open="isMenuOpen" @update:open="isMenuOpen = $event">
        <SheetContent side="left" class="w-[300px] p-0">
          <aside class="h-full">
            <div class="flex h-[52px] items-center px-6">
              <Car :size="24" class="mr-2 text-primary" />
              <h1 class="font-bold text-lg">CAR RENTAL</h1>
            </div>
            <Separator />
            <div class="flex-1 overflow-auto">
              <Nav
                :is-collapsed="false"
                :links="
                  store.modules || [
                    {
                      title: 'Projects',
                      label: '',
                      icon: 'lucide:layout-dashboard',
                      variant: 'default',
                      href: 'projects',
                    },
                  ]
                "
                :onNavigate="closeMenu"
              />
            </div>
          </aside>
        </SheetContent>
      </Sheet>

      <aside
        v-show="!isMobile"
        :class="
          cn(
            'transition-all duration-300 ease-in-out flex flex-col relative',
            isCollapsed ? `w-[${props.collapsedWidth}px]` : `w-[350px]`,
          )
        "
      >
        <div
          :class="
            cn(
              'flex h-[52px] items-center',
              isCollapsed ? 'justify-center' : 'px-6',
            )
          "
        >
          <Car :size="24" class="mr-2 text-primary" />
          <h1 :class="cn('font-bold text-lg', isCollapsed && 'sr-only')">
            CAR RENTAL
          </h1>
        </div>
        <Separator />
        <div class="flex-1 overflow-auto">
          <Nav
            :is-collapsed="isCollapsed"
            :links="
              store.modules || [
                {
                  title: 'Projects',
                  label: '',
                  icon: 'lucide:layout-dashboard',
                  variant: 'default',
                  href: 'projects',
                },
              ]
            "
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          class="absolute -right-[20px] top-[30px] z-10 rounded-full bg-background shadow-md"
          @click="toggleCollapse"
        >
          <ChevronLeft
            :class="
              cn('h-4 w-4 transition-transform', isCollapsed && 'rotate-180')
            "
          />
        </Button>
      </aside>

      <Separator orientation="vertical" v-if="!isMobile" />

      <div class="flex-1 overflow-hidden flex flex-col">
        <div class="flex-1 overflow-clip" :class="isMobile ? 'pt-16' : ''">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>
