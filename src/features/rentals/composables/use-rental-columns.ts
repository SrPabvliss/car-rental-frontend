import type { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import { createColumnHelper } from '@tanstack/vue-table'
import { format } from 'date-fns'

import type { IRental } from '../interfaces/IRental'
import { useRentalActions } from './use-rental-actions'

export function useRentalColumns(role: ROLE_ENUM, emit: any) {
  const columnHelper = createColumnHelper<IRental>()
  const { renderActions } = useRentalActions(role, emit)


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
      cell: info => 
        renderActions(info.row.original),
    }),
  ]

  return columns
}
