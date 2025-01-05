<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import IncidentListView from '@/features/incidents/presentation/views/incident-list-view.vue'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'

import { useRentalDetail } from '../../composables/use-rental-details'
import { useReturnRental } from '../../composables/use-return-rental'
import RentalSummary from '../components/rental-summary.vue'

const route = useRoute()
const router = useRouter()
const rentalId = route.params.id

const {
  rentalDetail: rental,
  loading: isLoadingRental,
  fetchRentalDetail,
} = useRentalDetail()
const { isProcessing, completeReturn } = useReturnRental(Number(rentalId))

const handleCompleteReturn = async () => {
  if (confirm('¿Está seguro de completar la devolución?')) {
    await completeReturn()
  }
}

onMounted(() => {
  fetchRentalDetail(Number(rentalId))
})
</script>

<template>
  <ContentLayout title="Procesar Devolución">
    <template #content>
      <div class="space-y-6">
        <CustomBreadcrumb
          :items="[
            { label: 'Alquileres', href: 'rentals' },
            {
              label: 'Devolución',
              href: `rentals/${rentalId}/return`,
              current: true,
            },
          ]"
        />

        <div v-if="isLoadingRental" class="text-center py-4">
          Cargando información del alquiler...
        </div>

        <template v-else>
          <RentalSummary v-if="rental" :rental="rental" />

          <IncidentListView :rentalId="Number(rentalId)" />

          <div class="flex justify-end gap-4">
            <Button variant="outline" @click="router.back()"> Cancelar </Button>
            <Button :disabled="isProcessing" @click="handleCompleteReturn">
              {{ isProcessing ? 'Procesando...' : 'Completar Devolución' }}
            </Button>
          </div>
        </template>
      </div>
    </template>
  </ContentLayout>
</template>
