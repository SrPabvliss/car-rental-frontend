<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'

import useRecoverPassword from '../../composables/use-recover-password'

const { onSubmit, schema } = useRecoverPassword()
</script>

<template>
  <AutoForm
    class="space-y-6"
    :schema="schema"
    @submit="onSubmit"
    :field-config="{
      email: { inputProps: { type: 'email' }, label: 'Correo electrónico' },
    }"
  >
    <Button type="submit" class="text-white"> Recuperar contraseña </Button>
  </AutoForm>
  <cite class="flex pt-2"
    >Ya tienes una cuenta?
    <router-link to="/login">
      <span class="text-blue-500 pl-1"> Inicia sesión </span>
    </router-link>
  </cite>
</template>
