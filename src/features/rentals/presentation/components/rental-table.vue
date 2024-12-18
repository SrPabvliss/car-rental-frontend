<script setup lang="ts">
import PaginationComponent from '@/shared/components/pagination-component.vue'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from '@tanstack/vue-table'
import { format } from 'date-fns'

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
  // columnHelper.display({
  //   id: 'actions',
  //   header: 'Acciones',
  //   cell: () => (
  //     <div class="flex items-center gap-2">
  //       <Button variant="ghost" size="icon">
  //         <Eye class="h-4 w-4" />
  //       </Button>
  //       <Button variant="ghost" size="icon">
  //         <Edit class="h-4 w-4" />
  //       </Button>
  //       <Button variant="ghost" size="icon">
  //         <Trash class="h-4 w-4" />
  //       </Button>
  //     </div>
  //   ),
  // }),
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
    <Table>
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
