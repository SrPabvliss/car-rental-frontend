<!-- features/rentals/presentation/views/initial-payment-view.vue -->
<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useAuthStore } from '@/features/auth/context/auth-store'
import { PaymentDatasourceImpl } from '@/features/payments/services/datasource'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'
import { FormInput, FormSelect } from '@/shared/components/forms'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { format } from 'date-fns'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useTempRentalStore } from '../../context/temp-rental-store'
import { RentalStatus } from '../../interfaces/IRental'
import { RentalDataSourceImpl } from '../../services/datasource'

const router = useRouter()
const toast = useToast()
const tempRentalStore = useTempRentalStore()
const isLoading = ref(false)
const selectedType = ref('Efectivo')
const initialPayment = ref('')

const PAYMENT_TYPES = [
  { value: 'Efectivo', label: 'Efectivo' },
  { value: 'Tarjeta', label: 'Tarjeta' },
  { value: 'Transferencia', label: 'Transferencia' },
]

const total = computed(() => tempRentalStore.rentalData?.total || 0)
const minPayment = computed(() => Math.round(total.value * 0.3 * 100) / 100)
const maxPayment = computed(() => Math.round(total.value * 0.8 * 100) / 100)

const isValidPayment = computed(() => {
  const amount = parseFloat(initialPayment.value)
  return amount >= minPayment.value && amount <= maxPayment.value
})

const error = computed(() => {
  if (!initialPayment.value) return null
  const amount = parseFloat(initialPayment.value)
  if (amount < minPayment.value) {
    return `El pago inicial debe ser al menos $${minPayment.value}`
  }
  if (amount > maxPayment.value) {
    return `El pago inicial no puede exceder $${maxPayment.value}`
  }
  return null
})

const breadcrumbItems = [
  { label: 'Vehículos', href: 'cars' },
  { label: 'Pago Inicial', href: '', current: true },
]

onMounted(() => {
  // Verificar que existan datos temporales
  if (!tempRentalStore.rentalData) {
    toast.error('No hay datos de alquiler')
    router.push({ name: 'cars' })
  }
})

const handleSubmit = async () => {
  if (!tempRentalStore.rentalData || !isValidPayment.value) return
  const { getUser } = useAuthStore()
  const user = getUser()

  isLoading.value = true
  try {
    // 1. Crear el rental
    const rental = await RentalDataSourceImpl.getInstance().create({
      startDate: format(
        tempRentalStore.rentalData.startDate,
        'dd/MM/yyyy:HH:mm',
      ) as unknown as Date,
      endDate: format(
        tempRentalStore.rentalData.endDate,
        'dd/MM/yyyy:HH:mm',
      ) as unknown as Date,
      status: RentalStatus.ACTIVE,
      total: tempRentalStore.rentalData.total,
      carId: tempRentalStore.rentalData.carId,
      userId: Number(user?.userId), // Este valor vendrá del auth store
    })

    if (!rental) throw new Error('Error al crear el alquiler')

    // 2. Registrar el pago inicial
    await PaymentDatasourceImpl.getInstance().create({
      amount: parseFloat(initialPayment.value),
      paymentDate: format(new Date(), 'dd/MM/yyyy:HH:mm') as unknown as Date,
      status: 'Completado',
      type: selectedType.value,
      rentalId: rental.id,
    })

    // 3. Limpiar datos temporales y redireccionar
    tempRentalStore.clearRentalData()
    toast.success('Alquiler creado y pago inicial procesado correctamente')
    router.push({ name: 'rentals' })
  } catch {
    toast.error('Error al procesar el pago inicial')
    // console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <ContentLayout title="Pago Inicial">
    <template #content>
      <div class="space-y-6">
        <CustomBreadcrumb :items="breadcrumbItems" />

        <div class="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Información del Pago Inicial</CardTitle>
            </CardHeader>
            <CardContent class="space-y-6">
              <!-- Resumen del alquiler -->
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Total del alquiler:</span>
                  <span>${{ total.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm text-muted-foreground">
                  <span>Pago inicial mínimo (30%):</span>
                  <span>${{ minPayment.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm text-muted-foreground">
                  <span>Pago inicial máximo (80%):</span>
                  <span>${{ maxPayment.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Formulario de pago -->
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <FormInput
                  id="initialPayment"
                  label="Monto del pago inicial"
                  v-model="initialPayment"
                  type="number"
                  step="0.01"
                  placeholder="Ingrese el monto a pagar"
                  :error="error"
                />

                <FormSelect
                  id="paymentType"
                  label="Método de Pago"
                  placeholder="Seleccione un método de pago"
                  :options="PAYMENT_TYPES"
                  v-model="selectedType"
                />

                <div class="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    @click="router.back()"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    :disabled="!isValidPayment || isLoading"
                  >
                    <LoadingSpinner v-if="isLoading" size="small" />
                    <span v-else>Confirmar Pago Inicial</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </template>
  </ContentLayout>
</template>
