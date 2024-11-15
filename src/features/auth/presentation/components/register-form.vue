<script setup lang="ts">
import { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import { useForm } from '@/lib/composables/use-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import useRegister from '../../composables/use-register'

const { schema, onSubmit } = useRegister()
const { formData, errors, handleSubmit, validateField } = useForm(schema)

const submitForm = () => handleSubmit(onSubmit)

const roleOptions = Object.values(ROLE_ENUM)
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <Label for="name">Nombre</Label>
      <Input
        v-model="formData.name"
        type="text"
        id="name"
        name="name"
        placeholder="Ingrese su nombre"
        @input="validateField('name')"
      />
      <p v-if="errors.name" class="text-red-500 text-xs">{{ errors.name }}</p>
    </div>

    <div>
      <Label for="lastName">Apellido</Label>
      <Input
        v-model="formData.lastName"
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Ingrese su apellido"
        @input="validateField('lastName')"
      />
      <p v-if="errors.lastName" class="text-red-500 text-xs">
        {{ errors.lastName }}
      </p>
    </div>

    <div>
      <Label for="email">Correo electrónico</Label>
      <Input
        v-model="formData.email"
        type="email"
        id="email"
        name="email"
        placeholder="Ingrese su correo electrónico"
        @input="validateField('email')"
      />
      <p v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</p>
    </div>

    <div>
      <Label for="password">Contraseña</Label>
      <Input
        v-model="formData.password"
        type="password"
        id="password"
        name="password"
        placeholder="Ingrese su contraseña"
        @input="validateField('password')"
      />
      <p v-if="errors.password" class="text-red-500 text-xs">
        {{ errors.password }}
      </p>
    </div>

    <div>
      <Label for="phone">Teléfono</Label>
      <Input
        v-model="formData.phone"
        type="number"
        id="phone"
        name="phone"
        placeholder="Ingrese su número de teléfono"
        pattern="/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/"
        @input="validateField('phone')"
      />
      <p v-if="errors.phone" class="text-red-500 text-xs">{{ errors.phone }}</p>
    </div>

    <div>
      <Label for="address">Dirección</Label>
      <Input
        v-model="formData.address"
        type="text"
        id="address"
        name="address"
        placeholder="Ingrese su dirección"
        @input="validateField('address')"
      />
      <p v-if="errors.address" class="text-red-500 text-xs">
        {{ errors.address }}
      </p>
    </div>

    <div>
      <label for="role" class="block text-sm font-medium text-gray-700"
        >Rol</label
      >
      <select
        v-model="formData.role"
        @change="validateField('role')"
        id="role"
        name="role"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="" disabled selected>Seleccione un rol</option>
        <option v-for="role in roleOptions" :key="role" :value="role">
          {{ role }}
        </option>
      </select>

      <p v-if="errors.role" class="text-red-500 text-xs mt-1">
        {{ errors.role }}
      </p>
    </div>

    <Button type="submit" class="text-white">Registrarse</Button>

    <cite class="flex pt-2">
      Ya tienes una cuenta?
      <router-link to="/login">
        <span class="text-blue-500 pl-1">Inicia sesión</span>
      </router-link>
    </cite>
  </form>
</template>
