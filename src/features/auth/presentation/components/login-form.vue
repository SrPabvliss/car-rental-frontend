<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'

import useLogin from '../../composables/use-login'

const { onSubmit, schema } = useLogin()
</script>

<template>
  <AutoForm
    class="space-y-6"
    :schema="schema"
    @submit="onSubmit"
    :field-config="{
      email: { inputProps: { type: 'email' }, label: 'Correo electrónico' },
      password: { inputProps: { type: 'password' }, label: 'Contraseña' },
    }"
  >
    <section class="flex flex-col">
      <router-link to="/recover-password" class="-mt-6 mb-4">
        <cite class="text-slate-400 text-xs"> Olvidaste tu contraseña?</cite>
      </router-link>
      <Button type="submit" class="text-white"> Iniciar sesión </Button>
    </section>
  </AutoForm>
  <cite class="flex pt-2"
    >No tienes una cuenta?
    <router-link to="/register">
      <span class="text-blue-500 pl-1"> Regístrate </span>
    </router-link>
  </cite>
</template>
