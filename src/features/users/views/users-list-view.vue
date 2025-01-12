<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { UserDataSourceImpl } from '@/features/users/services/datasource'
import ConfirmationDialog from '@/shared/components/confirmation-dialog.vue'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { UserPlus } from 'lucide-vue-next'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import { Button } from '@/components/ui/button'

import UserCard from '../components/user-card.vue'
import UserFormDialog from '../components/user-form-dialog.vue'
import type { IUser } from '../interfaces/IUser'

const users = ref<IUser[]>([])
const loading = ref(false)
const showUserForm = ref(false)
const selectedUser = ref<IUser | undefined>(undefined)
const showDeleteConfirm = ref(false)
const userToDelete = ref<number | null>(null)

const loadUsers = async () => {
  loading.value = true
  try {
    const result = await UserDataSourceImpl.getInstance().getAll()
    users.value = result
  } catch {
    useToast().error('Error al cargar usuarios')
  } finally {
    loading.value = false
  }
}

const openUserForm = async (userId: number) => {
  try {
    const user = await UserDataSourceImpl.getInstance().getById(userId)
    selectedUser.value = user
  } catch {
    useToast().error('Error al cargar los datos del usuario.')
  } finally {
    showUserForm.value = true
  }
}

const handleCreateUser = async (userData: any) => {
  try {
    if (selectedUser.value) {
      // Actualizar usuario existente
      await UserDataSourceImpl.getInstance().update(selectedUser.value.id, {
        ...userData,
        password: userData.password === '' ? undefined : userData.password,
      })
      useToast().success('Usuario actualizado exitosamente')
    } else {
      // Crear nuevo usuario
      await UserDataSourceImpl.getInstance().create(userData)
      useToast().success('Usuario creado exitosamente')
    }
    loadUsers()
  } catch {
    useToast().error(
      selectedUser.value
        ? 'Error al actualizar usuario'
        : 'Error al crear usuario',
    )
  } finally {
    selectedUser.value = undefined
  }
}

const handleDeleteUser = (userId: number) => {
  userToDelete.value = userId
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  if (!userToDelete.value) return

  try {
    await UserDataSourceImpl.getInstance().delete(userToDelete.value)
    useToast().success('Usuario eliminado exitosamente')
    loadUsers()
  } catch {
    useToast().error('Error al eliminar usuario')
  } finally {
    showDeleteConfirm.value = false
    userToDelete.value = null
  }
}

loadUsers()
</script>

<template>
  <ContentLayout title="Gestión de Usuarios">
    <template #content>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <CustomBreadcrumb
            :items="[{ label: 'Usuarios', href: 'users', current: true }]"
          />
          <Button @click="showUserForm = true">
            <UserPlus class="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>

        <div v-if="loading" class="text-center py-8">Cargando usuarios...</div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <UserCard
            v-for="user in users"
            :key="user.id"
            :user="user"
            @edit="openUserForm"
            @delete="handleDeleteUser"
          />
        </div>

        <UserFormDialog
          v-model:show="showUserForm"
          :user="selectedUser"
          @submit="handleCreateUser"
        />

        <ConfirmationDialog
          :visible="showDeleteConfirm"
          title="Eliminar Usuario"
          message="¿Está seguro de eliminar este usuario? Esta acción no se puede deshacer."
          @confirm="confirmDelete"
          @cancel="showDeleteConfirm = false"
        />
      </div>
    </template>
  </ContentLayout>
</template>
