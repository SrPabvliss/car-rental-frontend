<script setup lang="ts">
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { Mail } from 'lucide-vue-next'
import { type PropType } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true,
  },
  onConfirm: {
    type: Function as PropType<() => void>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  userEmail: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Dialog :open="isOpen" @openChange="onClose">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Enviar Factura</DialogTitle>
        <DialogDescription>
          La factura será enviada al correo electrónico:
          <span class="font-medium block mt-1">{{ userEmail }}</span>
        </DialogDescription>
      </DialogHeader>

      <div class="flex items-center justify-center p-4">
        <Mail class="w-12 h-12 text-primary" />
      </div>

      <DialogFooter>
        <Button variant="outline" @click="onClose" :disabled="loading">
          Cancelar
        </Button>
        <Button @click="onConfirm" :disabled="loading">
          <template v-if="loading">
            <LoadingSpinner size="small" />
          </template>
          <template v-else> Enviar Factura </template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
