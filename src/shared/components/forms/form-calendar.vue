<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps<{
  id: string
  label?: string
  modelValue: Date | undefined
  placeholder?: string
  error?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Date | undefined]
}>()

const df = new DateFormatter('es', {
  dateStyle: 'long',
})

// Convertir Date a DateValue para el calendario
const calendarValue = computed<DateValue | undefined>({
  get: () => {
    if (!props.modelValue) return undefined
    return parseDate(props.modelValue.toISOString().split('T')[0])
  },
  set: (value: DateValue | undefined) => {
    if (!value) {
      emit('update:modelValue', undefined)
      return
    }
    // Convertir DateValue a Date
    emit('update:modelValue', value.toDate(getLocalTimeZone()))
  },
})

const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  return calendarValue.value
    ? df.format(calendarValue.value.toDate(getLocalTimeZone()))
    : ''
})
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label v-if="label" :for="id">{{ label }}</Label>

    <Popover>
      <PopoverTrigger as-child>
        <Button
          :id="id"
          variant="outline"
          :class="
            cn(
              'w-full justify-start text-left font-normal',
              !modelValue && 'text-muted-foreground',
            )
          "
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{ modelValue ? formattedDate : placeholder || 'Seleccionar fecha' }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar
          v-model="calendarValue"
          :defaultValue="today(getLocalTimeZone())"
          mode="single"
          initial-focus
        />
      </PopoverContent>
    </Popover>

    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>
