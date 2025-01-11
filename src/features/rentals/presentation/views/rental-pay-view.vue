<!-- features/rentals/presentation/views/rental-pay-view.vue -->
<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { usePaymentForm } from '@/features/payments/composables/payment-form'
import PaymentForm from '@/features/payments/presentation/components/payment-form.vue'
import router from '@/router'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { IRental } from '../../interfaces/IRental'
import { RentalDataSourceImpl } from '../../services/datasource'

const route = useRoute()
const toast = useToast()
const rental = ref<IRental | null>(null)
const isLoadingRental = ref(false)

const rentalId = Number(route.params.id)
const { isLoading, selectedType, handlePayment } = usePaymentForm(rentalId)

const incidentsAmount = computed(() => {
  if (!rental.value?.incidents) return 0
  return rental.value.incidents.reduce(
    (acc, incident) => acc + incident.repairCost,
    0,
  )
})

// Calcular el monto restante a pagar basado en pagos previos
const remainingAmount = computed(() => {
  if (!rental.value) return 0
  const totalWithIncidents = rental.value.total + incidentsAmount.value
  const paidAmount = rental.value.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  )
  return Math.max(totalWithIncidents - paidAmount, 0)
})

const loadRental = async () => {
  isLoadingRental.value = true
  try {
    rental.value = await RentalDataSourceImpl.getInstance().getById(rentalId)

    // Verificar si ya está completamente pagado
    if (rental.value.payments.length >= 2) {
      toast.error('Este alquiler ya está completamente pagado')
      router.push({ name: 'rentals' })
      return
    }

    // Verificar si es el primer pago (no debería acceder aquí)
    if (rental.value.payments.length === 0) {
      toast.error('Este alquiler requiere un pago inicial')
      router.push({ name: 'rentals' })
      return
    }
  } catch {
    toast.error('Error al cargar el alquiler')
  } finally {
    isLoadingRental.value = false
  }
}

const onSubmit = () => {
  if (!rental.value) return
  handlePayment(remainingAmount.value)
}

onMounted(() => {
  loadRental()
})
</script>

<template>
  <ContentLayout title="Procesar Pago Final">
    <template #content>
      <CustomBreadcrumb
        :items="[
          { label: 'Alquileres', href: 'rentals' },
          { label: 'Pago Final', href: '', current: true },
        ]"
      />

      <div v-if="isLoadingRental" class="text-center my-8">Cargando...</div>

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
                <p class="font-medium">
                  {{ rental.car.brand }} {{ rental.car.model }}
                </p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Matrícula</p>
                <p class="font-medium">{{ rental.car.plate }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Resumen de Pagos -->
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Total del alquiler:</span>
                <span>${{ rental.total.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-red-600">
                <span>Costo de incidentes:</span>
                <span>${{ incidentsAmount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-blue-600">
                <span>Pago inicial realizado:</span>
                <span>${{ rental.payments[0].amount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-bold mt-2 pt-2 border-t">
                <span>Monto restante a pagar:</span>
                <span>${{ remainingAmount.toFixed(2) }}</span>
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
