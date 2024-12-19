<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

import ContentLayout from '@/core/layout/content-layout.vue'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import PaymentForm from '@/features/payments/presentation/components/payment-form.vue'
import { usePaymentForm } from '@/features/payments/composables/payment-form'
import { RentalDataSourceImpl } from '../../services/datasource'
import type { IRental } from '../../interfaces/IRental'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const toast = useToast()
const rental = ref<IRental | null>(null)
const isLoadingRental = ref(false)

const rentalId = Number(route.params.id)
const { isLoading, selectedType, handlePayment } = usePaymentForm(rentalId)

const incidentsAmount = computed(() => {
  if (!rental.value?.incidents) return 0
  return rental.value.incidents.reduce((acc, incident) => acc + incident.cost, 0)
})

const loadRental = async () => {
  isLoadingRental.value = true
  try {
    rental.value = await RentalDataSourceImpl.getInstance().getById(rentalId)
  } catch {
    toast.error('Error al cargar el alquiler')
  } finally {
    isLoadingRental.value = false
  }
}

const onSubmit = () => {
  if (!rental.value) return
  handlePayment(rental.value.total + incidentsAmount.value)
}

onMounted(() => {
  loadRental()
})
</script>

<template>
  <ContentLayout title="Procesar Pago">
    <template #content>
      <CustomBreadcrumb 
        :items="[
          { label: 'Alquileres', href: 'rentals' },
          { label: 'Pago', href: '', current: true }
        ]"
      />
      
      <div v-if="isLoadingRental" class="text-center my-8">
        Cargando...
      </div>
      
      <div v-else-if="rental" class="max-w-xl mx-auto mt-6 space-y-6">
        <!-- Detalles del Vehículo -->
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Vehículo</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-muted-foreground">Vehículo</p>
                <p class="font-medium">{{ rental.car.brand }} {{ rental.car.model }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Año</p>
                <p class="font-medium">{{ rental.car.year }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Matrícula</p>
                <p class="font-medium">{{ rental.car.plate }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Tipo</p>
                <p class="font-medium">{{ rental.car.type }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Formulario de Pago -->
        <PaymentForm
          v-model:selectedType="selectedType"
          :isLoading="isLoading"
          :baseAmount="rental.total"
          :incidentsAmount="incidentsAmount"
          @submit="onSubmit"
        />
      </div>
    </template>
  </ContentLayout>
</template>