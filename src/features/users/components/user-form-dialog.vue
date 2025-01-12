<script setup lang="ts">
import { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import { useForm } from '@/lib/composables/use-form'
import { FormInput, FormSelect } from '@/shared/components/forms'
import { computed, ref, watch } from 'vue'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    default: null,
  },
})

const baseUserSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(['Administrador', 'Cliente', 'Empleado'], {
    required_error: 'El rol es obligatorio',
  }),
})

// Crear los schemas una sola vez fuera del computed
const editUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .optional(),
})

const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

// Schema dinámico basado en si existe usuario
const dynamicSchema = computed(() => {
  return props.user ? editUserSchema : createUserSchema
})

const emit = defineEmits<{
  'update:show': [value: boolean]
  submit: [data: any]
}>()

const defaultValues = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  role: ROLE_ENUM.CLIENT,
}

const { formData, errors, handleSubmit, resetForm, validateField, setSchema } =
  useForm(dynamicSchema.value, defaultValues)

watch(
  () => props.user,
  () => {
    setSchema(dynamicSchema.value)
  },
  { immediate: true },
)

const isSubmitting = ref(false)

const roleOptions = [
  { value: ROLE_ENUM.ADMIN, label: 'Administrador' },
  { value: ROLE_ENUM.EMPLOYEE, label: 'Empleado' },
  { value: ROLE_ENUM.CLIENT, label: 'Cliente' },
]

watch(
  () => props.user,
  newUser => {
    if (newUser) {
      resetForm({
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        password: '',
        phone: newUser.phone || '',
        role: newUser.role,
      })
    } else {
      resetForm(defaultValues)
    }
  },
  { immediate: true },
)

watch(
  () => props.show,
  newShow => {
    if (!newShow) {
      resetForm(defaultValues)
    }
  },
)

const onSubmit = () => {
  handleSubmit(async data => {
    isSubmitting.value = true
    try {
      // Solo incluir password si no está vacío
      const submitData = { ...data }
      if (!submitData.password) {
        delete submitData.password
      }
      emit('submit', submitData)
      emit('update:show', false)
    } finally {
      isSubmitting.value = false
    }
  })
}
</script>

<template>
  <Dialog :open="show" @update:open="$emit('update:show', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ user ? 'Editar' : 'Crear' }} Usuario</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <FormInput
          id="name"
          label="Nombre"
          v-model="formData.name"
          :error="errors.name"
          @update:modelValue="validateField('name')"
        />

        <FormInput
          id="lastName"
          label="Apellido"
          v-model="formData.lastName"
          :error="errors.lastName"
          @update:modelValue="validateField('lastName')"
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          v-model="formData.email"
          :error="errors.email"
          @update:modelValue="validateField('email')"
        />

        <FormInput
          id="password"
          label="Contraseña"
          type="password"
          v-model="formData.password as string"
          :error="errors.password"
          @update:modelValue="validateField('password')"
          :placeholder="
            user
              ? 'Dejar vacío para mantener la contraseña actual'
              : 'Ingrese una contraseña'
          "
        />

        <FormInput
          id="phone"
          label="Teléfono"
          v-model="formData.phone as string"
          :error="errors.phone"
          @update:modelValue="validateField('phone')"
        />

        <FormSelect
          id="role"
          label="Rol"
          :options="roleOptions"
          v-model="formData.role"
          :error="errors.role"
          @update:modelValue="validateField('role')"
        />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            @click="$emit('update:show', false)"
          >
            Cancelar
          </Button>
          <Button type="submit" :disabled="isSubmitting">
            {{ user ? 'Actualizar' : 'Crear' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
