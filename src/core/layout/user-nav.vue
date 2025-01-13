<script setup lang="ts">
import { useAuthStore } from '@/features/auth/context/auth-store'
import router from '@/router'
import { LogOut } from 'lucide-vue-next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const { getUser, logout: storeLogout } = useAuthStore()

const logout = () => {
  storeLogout()
  router.push('/login')
}


const user = getUser()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        className="relative h-8 w-8 rounded-full border border-border"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage :src="''" alt="Avatar" class="rounded-full" />
          <AvatarFallback className="bg-transparent">{{
            user?.email.charAt(0).toUpperCase()
          }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        <div class="flex flex-col">
          <p>
            {{ user?.email }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ user?.role }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="logout">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Cerrar sesión</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
