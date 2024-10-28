<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import useRegister from '../../composables/use-register'
const { onSubmit, schema } = useRegister()
</script>

<template>
    <AutoForm
      class="space-y-6"
      :schema="schema"
      @submit="onSubmit"
      :field-config="{
        name: { inputProps: { type: 'text' }, label: 'Nombre' },
        lastName: { inputProps: { type: 'text' }, label: 'Apellido' },
        email: { inputProps: { type: 'email' }, label: 'Correo electrónico' },
        password: { inputProps: { type: 'password' }, label: 'Contraseña' },
        phone: { inputProps: { type: 'tel', pattern:'[0-9]{3}-[0-9]{2}-[0-9]{3}' }, label: 'Teléfono' },
        address: { inputProps: { type: 'text' }, label: 'Dirección' },
      }"
    >
        <Button type="submit" class="text-white"> Registrarse </Button>
    </AutoForm>
    <cite class="flex pt-2">Ya tienes una cuenta? 
        <router-link to="/login">
            <span class="text-blue-500 pl-1"> Inicia sesión </span>
        </router-link>
    </cite>
</template>