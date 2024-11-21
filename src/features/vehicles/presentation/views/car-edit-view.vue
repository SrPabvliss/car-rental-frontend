<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { onMounted } from 'vue'

import CustomBreadcrumb from '../../../../shared/components/custom-breadcrumb.vue'
import useEditVehicle from '../../composables/use-edit-view'
import NewEditForm from '../components/forms/new-edit-form.vue'

const { vehicle, breadcrumbItems, loadVehicle, isLoading } = useEditVehicle()

onMounted(() => {
  loadVehicle()
})
</script>

<template>
  <ContentLayout title="Editar vehículo">
    <template #content>
      <CustomBreadcrumb :items="breadcrumbItems" />
      <div v-if="isLoading" class="text-center my-6">Cargando...</div>
      <NewEditForm v-if="vehicle" :car="vehicle" />
    </template>
  </ContentLayout>
</template>
