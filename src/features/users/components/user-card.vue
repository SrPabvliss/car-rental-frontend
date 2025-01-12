<script setup lang="ts">
import { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import { cn } from '@/lib/utils'
import { Edit, Trash, UserCog } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

defineProps<{
  user: {
    id: number
    name: string
    lastName: string
    email: string
    phone?: string
    role: string
    active: boolean
  }
}>()

const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()

const getRoleColor = (role: string) => {
  switch (role) {
    case ROLE_ENUM.ADMIN:
      return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
    case ROLE_ENUM.EMPLOYEE:
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
    default:
      return 'bg-green-100 text-green-800 hover:bg-green-100'
  }
}
</script>

<template>
  <Card class="h-[200px] flex flex-col">
    <CardHeader
      class="flex-none flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <div class="flex items-center space-x-2">
        <UserCog class="h-4 w-4" />
        <span class="font-semibold truncate"
          >{{ user.name }} {{ user.lastName }}</span
        >
      </div>
      <Badge :class="getRoleColor(user.role)">{{ user.role }}</Badge>
    </CardHeader>
    <CardContent class="flex-1 flex flex-col justify-between">
      <div class="space-y-2">
        <div class="text-sm flex items-center space-x-2">
          <span class="text-muted-foreground w-20 flex-shrink-0">Email:</span>
          <span class="truncate">{{ user.email }}</span>
        </div>
        <div v-if="user.phone" class="text-sm flex items-center space-x-2">
          <span class="text-muted-foreground w-20 flex-shrink-0"
            >Teléfono:</span
          >
          <span>{{ user.phone }}</span>
        </div>
        <div class="text-sm flex items-center space-x-2">
          <span class="text-muted-foreground w-20 flex-shrink-0">Estado:</span>
          <Badge
            :class="
              cn(
                user.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800',
              )
            "
          >
            {{ user.active ? 'Activo' : 'Inactivo' }}
          </Badge>
        </div>
      </div>
      <div class="flex justify-end space-x-2 pt-2">
        <Button
          variant="ghost"
          size="sm"
          @click="emit('edit', user.id)"
          data-testid="edit-user-button"
        >
          <Edit class="h-4 w-4 mr-2" />
          Editar
        </Button>

        <Button
          variant="destructive"
          size="sm"
          @click="emit('delete', user.id)"
          data-testid="delete-user-button"
        >
          <Trash class="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
