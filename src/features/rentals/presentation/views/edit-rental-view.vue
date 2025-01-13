<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { useRentalDetail } from '../../composables/use-rental-details';
import EditRentalForm from '../components/forms/edit-rental-form.vue';

const route = useRoute()
const { loading, error, rentalDetail, fetchRentalDetail } = useRentalDetail()

const breadcrumbItems = [
  { label: 'Alquileres', href: 'rentals' },
  { label: 'Editar', href: '', current: true },
]

onMounted(() => {
  const rentalId = Number(route.params.id)
  if (rentalId) {
    fetchRentalDetail(rentalId)
  }
})
</script>

<template>
  <ContentLayout title="Editar Alquiler">
    <template #content>
      <CustomBreadcrumb :items="breadcrumbItems" />
      
      <div v-if="loading" class="text-center my-6">
        Cargando...
      </div>
      
      <div v-else-if="error" class="text-red-500 my-6">
        {{ error }}
      </div>
      
      <EditRentalForm
        v-else-if="rentalDetail"
        :rental="rentalDetail"
      />
    </template>
  </ContentLayout>
</template>