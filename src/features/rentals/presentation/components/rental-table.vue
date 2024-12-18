<script setup lang="ts">
import PaginationComponent from '@/shared/components/pagination-component.vue'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from '@tanstack/vue-table'
import { format } from 'date-fns'
import { Edit, Eye, Trash } from 'lucide-vue-next'
import { h } from 'vue'

import { Button } from '@/components/ui/button'
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

import { useRentals } from '../../composables/use-rentals'
import type { IRental } from '../../interfaces/IRental'

const { rentals, loading, filters, totalItems } = useRentals()
const columnHelper = createColumnHelper<IRental>()

const columns = [
  columnHelper.accessor('startDate', {
    header: 'Fecha Inicio',
    cell: info => format(new Date(info.getValue()), 'dd/MM/yyyy HH:mm'),
  }),
  columnHelper.accessor('endDate', {
    header: 'Fecha Fin',
    cell: info => format(new Date(info.getValue()), 'dd/MM/yyyy HH:mm'),
  }),
  columnHelper.accessor('car', {
    header: 'Vehículo',
    cell: info => `${info.getValue().brand} ${info.getValue().model}`,
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('total', {
    header: 'Total',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Acciones',
    cell: () =>
      h('div', { class: 'flex items-center gap-2' }, [
        h(Button, { variant: 'ghost', size: 'icon' }, () =>
          h(Eye, { class: 'h-4 w-4' }),
        ),
        h(Button, { variant: 'ghost', size: 'icon' }, () =>
          h(Edit, { class: 'h-4 w-4' }),
        ),
        h(Button, { variant: 'ghost', size: 'icon' }, () =>
          h(Trash, { class: 'h-4 w-4' }),
        ),
      ]),
  }),
]

const table = useVueTable({
  get data() {
    return rentals.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="space-y-4">
    <Card v-if="!rentals.length && !loading" class="border-dashed">
      <CardHeader>
        <CardTitle>No haz realizado ningún alquiler</CardTitle>
        <CardDescription>
          No se encontraron alquileres a tu nombre, elige el vehículo que más te
          guste y comienza a disfrutar de la experiencia.
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
      <PaginationComponent v-model="filters" :total-items="totalItems" />
    </div>
  </div>
</template>
