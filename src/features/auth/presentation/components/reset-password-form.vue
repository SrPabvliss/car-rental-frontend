<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'

import useResetPassword from '../../composables/use-reset-password'

const { onSubmit, schema } = useResetPassword()
</script>

<template>
  <AutoForm
    class="space-y-6"
    :schema="schema"
    @submit="onSubmit"
    :field-config="{
      token: { inputProps: { type: 'text' }, label: 'Token' },
      newPassword: { inputProps: { type: 'password' }, label: 'Contraseña' },
      confirmPassword: {
        inputProps: { type: 'password' },
        label: 'Confirmar contraseña',
      },
    }"
  >
    <Button type="submit" class="text-white"> Cambiar contraseña </Button>
  </AutoForm>
</template>
