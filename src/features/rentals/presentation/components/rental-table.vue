<script setup lang="ts">
import type { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import PaginationComponent from '@/shared/components/pagination-component.vue'
import type { IFilter } from '@/shared/interfaces/IFilter'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useRentalColumns } from '../../composables/use-rental-columns'
import type { IRental } from '../../interfaces/IRental'

interface Props {
  rentals: IRental[]
  loading?: boolean
  filters: IFilter
  totalItems: number
  role: ROLE_ENUM
  emptyMessage?: {
    title?: string
    description?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyMessage: () => ({
    title: 'No haz realizado ningún alquiler',
    description:
      'No se encontraron alquileres a tu nombre, elige el vehículo que más te guste y comienza a disfrutar de la experiencia.',
  }),
})

const emit = defineEmits<{
  'update:filters': [filters: IFilter]
  view: [id: number]
  edit: [id: number]
  delete: [id: number]
  cancel: [id: number]
  pay: [id: number]
  downloadInvoice: [id: number]
  processReturn: [id: number]
}>()


const columns = useRentalColumns(props.role, emit)

const table = useVueTable({
  get data() {
    return props.rentals
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})

const handleFiltersUpdate = (newFilters: IFilter) => {
  emit('update:filters', newFilters)
}
</script>

<template>
  <div class="space-y-4">
    <Card v-if="!rentals.length && !loading" class="border-dashed">
      <CardHeader>
        <CardTitle>{{ emptyMessage.title }}</CardTitle>
        <CardDescription>
          {{ emptyMessage.description }}
        </CardDescription>
      </CardHeader>
    </Card>

    <Table v-else>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="!loading">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <TableRow v-else>
          <TableCell :colspan="columns.length" class="h-24 text-center">
            Cargando rentals...
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div v-if="totalItems" class="mt-4">
      <PaginationComponent
        :model-value="filters"
        :total-items="totalItems"
        @update:model-value="handleFiltersUpdate"
      />
    </div>
  </div>
</template>
