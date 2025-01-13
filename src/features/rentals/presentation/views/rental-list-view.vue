<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useAuthStore } from '@/features/auth/context/auth-store'
import ClientDropdown from '@/features/users/components/client-dropdown.vue'
import router from '@/router'
import ConfirmationDialog from '@/shared/components/confirmation-dialog.vue'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'

import { Button } from '@/components/ui/button'

import { useRentals } from '../../composables/use-rentals'
import InvoiceDialog from '../components/invoices/invoice-dialog.vue'
import RentalDialog from '../components/rental-dialog.vue'
import RentalTable from '../components/rental-table.vue'

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
  handleCancelDialog,
  selectedClient,
  isEmployee,
  handleClientChange,
  isInvoiceDialogOpen,
  isInvoiceSending,
  handleCancelInvoice,
  handleSendInvoice,
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
          <div class="flex justify-end" v-if="!isEmployee">
            <Button @click="rentACar">Rentar un vehículo</Button>
          </div>
        </div>

        <ClientDropdown
          v-if="isEmployee"
          v-model="selectedClient"
          @update:modelValue="handleClientChange"
        />

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

        <InvoiceDialog
          :is-open="isInvoiceDialogOpen"
          :loading="isInvoiceSending"
          :user-email="user?.email"
          @close="handleCancelInvoice"
          @confirm="handleSendInvoice"
        />
      </div>
    </template>
  </ContentLayout>
</template>
