<script setup lang="ts">
import { FormSelect } from '@/shared/components/forms'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'

const PAYMENT_TYPES = [
  { value: 'Efectivo', label: 'Efectivo' },
  { value: 'Tarjeta', label: 'Tarjeta' },
  { value: 'Transferencia', label: 'Transferencia' },
]

defineProps<{
  isLoading: boolean
  baseAmount: number
  incidentsAmount: number
  selectedType: string
}>()

const emit = defineEmits<{
  'update:selectedType': [value: string]
  submit: []
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Resumen de Montos -->
    <div class="space-y-2">
      <div class="flex justify-between">
        <span>Monto base:</span>
        <span>${{ baseAmount.toFixed(2) }}</span>
      </div>
      <div v-if="incidentsAmount > 0" class="flex justify-between">
        <span>Monto por incidentes:</span>
        <span>${{ incidentsAmount.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between font-bold">
        <span>Total a pagar:</span>
        <span>${{ (baseAmount + incidentsAmount).toFixed(2) }}</span>
      </div>
    </div>

    <!-- Formulario -->
    <FormSelect
      id="paymentType"
      label="Método de Pago"
      placeholder="Seleccione un método de pago"
      :options="PAYMENT_TYPES"
      :modelValue="selectedType"
      @update:modelValue="emit('update:selectedType', $event)"
    />

    <div class="flex justify-end gap-4">
      <Button variant="outline" @click="$router.back()">
        Cancelar
      </Button>
      <Button 
        @click="emit('submit')" 
        :disabled="isLoading"
      >
        <LoadingSpinner v-if="isLoading" size="small" />
        <span v-else>Confirmar Pago</span>
      </Button>
    </div>
  </div>
</template>