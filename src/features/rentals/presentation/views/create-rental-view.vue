<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { useRoute } from 'vue-router'

import NewEditForm from '../components/forms/new-edit-form.vue'

const breadcrumbItems = [
  { label: 'Vehículos', href: 'cars' },
  { label: 'Alquilar', href: 'cars-rent', current: true },
]

const route = useRoute()

const vehicleId = Number(route.params.id)
</script>

<template>
  <ContentLayout title="Crear nuevo vehículo">
    <template #content>
      <div class="space-y-4">
        <CustomBreadcrumb :items="breadcrumbItems" />
        <NewEditForm :car-id="vehicleId" />
      </div>
    </template>
  </ContentLayout>
</template>
