<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { format } from 'date-fns'
import { useMediaQuery } from '@vueuse/core'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { computed, h, watchEffect } from 'vue'
import { useRentalDetail } from '../../composables/use-rental-details'

const props = defineProps<{
  rentalId: number
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isDesktop = useMediaQuery('(min-width: 768px)')
const router = useRouter()
const { loading, error, rentalDetail, fetchRentalDetail } = useRentalDetail()

const canPay = computed(() => 
  rentalDetail.value?.status === 'Completado'
)

watchEffect(() => {
  if (props.open && props.rentalId) {
    fetchRentalDetail(props.rentalId)
  }
})

const handleClose = () => {
  emit('update:open', false)
}

const handlePayment = () => {
  if (rentalDetail.value) {
    router.push({
      name: 'rental-payment',
      params: { id: rentalDetail.value.id }
    })
  }
}

const RentalContent = () => {
  if (loading.value) {
    return h('div', { class: 'flex justify-center p-4' }, [
      h(LoadingSpinner)
    ])
  }

  if (error.value) {
    return h('div', { class: 'text-red-500 p-4' }, error.value)
  }

  if (!rentalDetail.value) {
    return null
  }

  const { car, startDate, endDate, incidents, total, status } = rentalDetail.value

  return h('div', { class: 'space-y-6' }, [
    h('div', { class: 'space-y-2' }, [
      h('h3', { class: 'font-medium' }, 'Vehículo'),
      h('div', { class: 'flex items-center gap-4' }, [
        car.imageUrl && h('img', {
          src: car.imageUrl,
          alt: `${car.brand} ${car.model}`,
          class: 'w-20 h-20 object-cover rounded'
        }),
        h('div', [
          h('p', `${car.brand} ${car.model}`),
          h('p', { class: 'text-sm text-muted-foreground' }, `Placa: ${car.plate}`)
        ])
      ])
    ]),

    h('div', { class: 'grid grid-cols-2 gap-4' }, [
      h('div', [
        h('p', { class: 'text-sm text-muted-foreground' }, 'Fecha inicio'),
        h('p', format(new Date(startDate), 'dd/MM/yyyy HH:mm'))
      ]),
      h('div', [
        h('p', { class: 'text-sm text-muted-foreground' }, 'Fecha fin'),
        h('p', format(new Date(endDate), 'dd/MM/yyyy HH:mm'))
      ])
    ]),

    h('div', { class: 'space-y-2' }, [
      h('h3', { class: 'font-medium' }, 'Desglose de costos'),
      h('div', { class: 'space-y-1' }, [
        h('div', { class: 'flex justify-between' }, [
          h('span', 'Tarifa base'),
          h('span', `$${total.toFixed(2)}`)
        ]),
        incidents?.length > 0 && h('div', { class: 'space-y-1 mt-2' }, [
          h('p', { class: 'text-sm font-medium' }, 'Incidentes:'),
          ...incidents.map(incident => 
            h('div', { class: 'flex justify-between text-sm' }, [
              h('span', incident.description),
              h('span', `$${incident.cost.toFixed(2)}`)
            ])
          )
        ]),
        h('div', { class: 'flex justify-between font-medium mt-2 pt-2 border-t' }, [
          h('span', 'Total'),
          h('span', `$${total.toFixed(2)}`)
        ])
      ])
    ]),

    canPay.value && h('div', { class: 'mt-4' }, [
      h(Button, {
        class: 'w-full',
        onClick: handlePayment
      }, 'Ir a pagar')
    ])
  ])
}
</script>

<template>
  <Dialog v-if="isDesktop" :open="open" @update:open="handleClose">
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Detalles del alquiler</DialogTitle>
        <DialogDescription>
          Información detallada del alquiler y sus costos asociados.
        </DialogDescription>
      </DialogHeader>
      <RentalContent />
    </DialogContent>
  </Dialog>

  <Drawer v-else :open="open" @update:open="handleClose">
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Detalles del alquiler</DrawerTitle>
        <DrawerDescription>
          Información detallada del alquiler y sus costos asociados.
        </DrawerDescription>
      </DrawerHeader>
      <div class="px-4">
        <RentalContent />
      </div>
      <DrawerFooter>
        <Button variant="outline" @click="handleClose">
          Cerrar
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>