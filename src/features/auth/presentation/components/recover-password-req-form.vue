<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'

import useRecoverPassword from '../../composables/use-recover-password'
import { useForm } from '@/lib/composables/use-form'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'

const { onSubmit, schema } = useRecoverPassword()
const { formData, errors, handleSubmit, validateField } = useForm(schema)

const submitForm = () => handleSubmit(onSubmit)
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <Label for="email" class="block text-sm font-medium text-gray-700"
        >Correo electrónico</Label
      >
      <Input
        v-model="formData.email"
        type="email"
        id="email"
        name="email"
        placeholder="Ingrese su correo electrónico"
        class="mt-1 block w-full"
        @input="validateField('email')"
      />
      <p v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</p>
    </div>

    <Button type="submit" class="text-white w-full"
      >Recuperar contraseña</Button
    >
    <cite class="flex pt-2"
      >Ya tienes una cuenta?
      <router-link to="/login">
        <span class="text-blue-500 pl-1"> Inicia sesión </span>
      </router-link>
    </cite>
  </form>
</template>
