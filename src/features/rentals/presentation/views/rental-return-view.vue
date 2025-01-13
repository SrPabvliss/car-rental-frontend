<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import IncidentListView from '@/features/incidents/presentation/views/incident-list-view.vue'
import ConfirmationDialog from '@/shared/components/confirmation-dialog.vue'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'

import { useRentalDetail } from '../../composables/use-rental-details'
import { useReturnRental } from '../../composables/use-return-rental'
import RentalSummary from '../components/rental-summary.vue'

const route = useRoute()
const router = useRouter()
const rentalId = route.params.id
const isConfirmationDialogOpen = ref(false)

const handleOpenDialog = () => {
  isConfirmationDialogOpen.value = true
  console.log('Opening dialog')
  console.log(isConfirmationDialogOpen.value)
}

const handleCancelConfirmationDialog = () => {
  isConfirmationDialogOpen.value = false
}

const {
  rentalDetail: rental,
  loading: isLoadingRental,
  fetchRentalDetail,
} = useRentalDetail()
const { isProcessing, completeReturn } = useReturnRental(Number(rentalId))

const handleCompleteReturn = async () => {
  await completeReturn()
  isConfirmationDialogOpen.value = false
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
            <Button :disabled="isProcessing" @click="handleOpenDialog">
              {{ isProcessing ? 'Procesando...' : 'Completar Devolución' }}
            </Button>
          </div>
        </template>
      </div>
      <ConfirmationDialog
        :visible="isConfirmationDialogOpen"
        title="Completar devolución"
        message="¿Estás seguro de que deseas completar la devolución? Esta acción no se puede deshacer."
        :loading="isProcessing"
        @confirm="handleCompleteReturn"
        @cancel="handleCancelConfirmationDialog"
      />
    </template>
  </ContentLayout>
</template>
