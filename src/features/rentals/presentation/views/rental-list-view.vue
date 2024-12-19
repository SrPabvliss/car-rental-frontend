<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useAuthStore } from '@/features/auth/context/auth-store'
import router from '@/router'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@/shared/components/confirmation-dialog.vue'

import { useRentals } from '../../composables/use-rentals'
import RentalTable from '../components/rental-table.vue'
import RentalDialog from '../components/rental-dialog.vue'

const {
  rentals,
  loading,
  filters,
  totalItems,
  handleFiltersUpdate,
  handleRentalAction,
  selectedRentalId,
  isDetailOpen,
  isCancelDialogOpen,
  cancelLoading,
  handleCancelConfirm,
  handleCancelDialog
} = useRentals()

const { getUser } = useAuthStore()
const user = getUser()!

const rentACar = () => {
  router.push({
    name: 'cars',
  })
}
</script>

<template>
  <ContentLayout title="Alquileres">
    <template #content>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <CustomBreadcrumb
            :items="[{ label: 'Alquiler', href: 'rental', current: true }]"
          />
          <div class="flex justify-end">
            <Button @click="rentACar">Rentar un vehículo</Button>
          </div>
        </div>

        <RentalTable
          :rentals="rentals"
          :loading="loading"
          :filters="filters"
          :total-items="totalItems"
          :role="user.role"
          @update:filters="handleFiltersUpdate"
          @view="handleRentalAction.view"
          @edit="handleRentalAction.edit"
          @delete="handleRentalAction.delete"
          @cancel="handleRentalAction.cancel"
          @pay="handleRentalAction.pay"
          @download-invoice="handleRentalAction.downloadInvoice"
          @process-return="handleRentalAction.processReturn"
        />

        <!-- Diálogo de detalles -->
        <RentalDialog
          v-if="selectedRentalId"
          :rental-id="selectedRentalId"
          v-model:open="isDetailOpen"
        />

        <!-- Diálogo de confirmación de cancelación -->
        <ConfirmationDialog
          :visible="isCancelDialogOpen"
          title="Cancelar alquiler"
          message="¿Estás seguro de que deseas cancelar este alquiler? Esta acción no se puede deshacer."
          :loading="cancelLoading"
          @confirm="handleCancelConfirm"
          @cancel="handleCancelDialog"
        />
      </div>
    </template>
  </ContentLayout>
</template>