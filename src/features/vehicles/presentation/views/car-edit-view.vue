<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { onMounted } from 'vue'

import useEditVehicle from '../../composables/use-edit-view'
import CarBreadcrumb from '../components/car-breadcrumb.vue'
import NewEditForm from '../components/forms/new-edit-form.vue'

const { vehicle, breadcrumbItems, loadVehicle, isLoading } = useEditVehicle()

onMounted(() => {
  loadVehicle()
})
</script>

<template>
  <ContentLayout title="Editar vehículo">
    <template #content>
      <CarBreadcrumb :items="breadcrumbItems" />
      <div v-if="isLoading" class="text-center my-6">Cargando...</div>
      <NewEditForm v-if="vehicle" :car="vehicle" />
    </template>
  </ContentLayout>
</template>
