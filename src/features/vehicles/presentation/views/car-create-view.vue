<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { ref } from 'vue'

import CustomBreadcrumb from '../../../../shared/components/custom-breadcrumb.vue'
import NewEditForm from '../components/forms/new-edit-form.vue'

const breadcrumbItems = ref([
  { label: 'Vehículos', href: 'cars' },
  { label: 'Crear', href: 'cars-create', current: true },
])
</script>

<template>
  <ContentLayout title="Crear nuevo vehículo">
    <template #content>
      <CustomBreadcrumb :items="breadcrumbItems" />
      <NewEditForm />
    </template>
  </ContentLayout>
</template>
