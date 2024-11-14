<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useLogin from '../../composables/use-login'
import { useForm } from '@/lib/composables/use-form'

const { schema, onSubmit } = useLogin()
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
        @blur="validateField('email')"
      />
      <p v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</p>
    </div>

    <div>
      <Label for="password" class="block text-sm font-medium text-gray-700"
        >Contraseña</Label
      >
      <Input
        v-model="formData.password"
        type="password"
        id="password"
        name="password"
        placeholder="Ingrese su contraseña"
        class="mt-1 block w-full"
        @blur="validateField('password')"
      />
      <p v-if="errors.password" class="text-red-500 text-xs">
        {{ errors.password }}
      </p>
    </div>

    <section class="flex flex-col">
      <router-link to="/recover-password" class="-mt-6 mb-4">
        <cite class="text-slate-400 text-xs">¿Olvidaste tu contraseña?</cite>
      </router-link>
      <Button type="submit" class="text-white">Iniciar sesión</Button>
    </section>

    <cite class="flex pt-2">
      ¿No tienes una cuenta?
      <router-link to="/register">
        <span class="text-blue-500 pl-1">Regístrate</span>
      </router-link>
    </cite>
  </form>
</template>
