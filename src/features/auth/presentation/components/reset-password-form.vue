<script setup lang="ts">
import { useForm } from '@/lib/composables/use-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import useResetPassword from '../../composables/use-reset-password'

const { schema, onSubmit } = useResetPassword()
const { formData, errors, handleSubmit, validateField } = useForm(schema)

const submitForm = () => handleSubmit(onSubmit)
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <Label for="token">Token</Label>
      <Input
        v-model="formData.token"
        type="text"
        id="token"
        name="token"
        placeholder="Ingrese su token"
        @input="validateField('token')"
      />
      <p v-if="errors.token" class="text-red-500 text-xs">{{ errors.token }}</p>
    </div>

    <div>
      <Label for="newPassword">Contraseña</Label>
      <Input
        v-model="formData.newPassword"
        type="password"
        id="newPassword"
        name="newPassword"
        placeholder="Ingrese su nueva contraseña"
        @input="validateField('newPassword')"
      />
      <p v-if="errors.newPassword" class="text-red-500 text-xs">
        {{ errors.newPassword }}
      </p>
    </div>

    <div>
      <Label for="confirmPassword">Confirmar Contraseña</Label>
      <Input
        v-model="formData.confirmPassword"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirme su nueva contraseña"
        @input="validateField('confirmPassword')"
      />
      <p v-if="errors.confirmPassword" class="text-red-500 text-xs">
        {{ errors.confirmPassword }}
      </p>
    </div>

    <Button type="submit" class="text-white">Cambiar contraseña</Button>
  </form>
</template>
