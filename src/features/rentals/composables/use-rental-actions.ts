import type { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import {
  Eye,
  Edit,
  Trash,
  Ban,
  Receipt,
  ArrowLeftRight,
  CreditCard,
} from 'lucide-vue-next'
import { h } from 'vue'

import { Button } from '@/components/ui/button'

import type { IRental } from '../interfaces/IRental'

interface RentalAction {
  icon: any
  label: string
  action: (rental: IRental) => void
  show: (rental: IRental) => boolean
  variant?: 'default' | 'destructive' | 'ghost' | 'outline'
}

export function useRentalActions(role: ROLE_ENUM, emit: any) {
  const baseActions: Record<ROLE_ENUM, (rental: IRental) => RentalAction[]> = {
    Cliente: rental => [
      {
        icon: Eye,
        label: 'Ver detalles',
        action: () => 
          emit('view', rental.id),
        show: () => true,
        variant: 'ghost',
      },
      {
        icon: CreditCard,
        label: 'Pagar',
        action: () => emit('pay', rental.id),
        show: () => rental.status === 'Completado',
        variant: 'default',
      },
      {
        icon: Receipt,
        label: 'Ver factura',
        action: () => emit('downloadInvoice', rental.id),
        show: () => rental.status === 'Pagado',
        variant: 'outline',
      },
      {
        icon: Edit,
        label: 'Editar',
        action: () => emit('edit', rental.id),
        show: () => rental.status === 'Activo',
        variant: 'ghost',
      },
      {
        icon: Ban,
        label: 'Cancelar',
        action: () => emit('cancel', rental.id),
        show: () => rental.status === 'Activo',
        variant: 'destructive',
      },
    ],
    Empleado: rental => [
      {
        icon: Eye,
        label: 'Ver detalles',
        action: () => emit('view', rental.id),
        show: () => true,
        variant: 'ghost',
      },
      {
        icon: ArrowLeftRight,
        label: 'Procesar devolución',
        action: () => emit('processReturn', rental.id),
        show: () => rental.status === 'Activo',
        variant: 'default',
      },
      {
        icon: Receipt,
        label: 'Ver factura',
        action: () => emit('viewInvoice', rental.id),
        show: () => rental.status === 'Pagado',
        variant: 'outline',
      },
    ],
    Administrador: rental => [
      {
        icon: Eye,
        label: 'Ver detalles',
        action: () => emit('view', rental.id),
        show: () => true,
        variant: 'ghost',
      },
      {
        icon: ArrowLeftRight,
        label: 'Procesar devolución',
        action: () => emit('processReturn', rental.id),
        show: () => rental.status === 'Activo',
        variant: 'default',
      },
      {
        icon: Edit,
        label: 'Editar',
        action: () => emit('edit', rental.id),
        show: () => rental.status !== 'Pagado',
        variant: 'ghost',
      },
      {
        icon: Ban,
        label: 'Cancelar',
        action: () => emit('cancel', rental.id),
        show: () => rental.status !== 'Pagado',
        variant: 'destructive',
      },
      {
        icon: Trash,
        label: 'Eliminar',
        action: () => emit('delete', rental.id),
        show: () => true,
        variant: 'destructive',
      },
    ],
  }

  const renderActions = (rental: IRental) => {
    const availableActions = baseActions[role](rental).filter(action =>
      action.show(rental),
    )

    console.log(availableActions)

    return h(
      'div',
      { class: 'flex items-center gap-2' },
      availableActions.map(action =>
        h(
          Button,
          {
            variant: action.variant || 'outline',
            size: 'icon',
            onClick: () => action.action(rental),
            'data-testid': `rental-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`,
            title: action.label,
          },
          () => h(action.icon, { class: 'h-4 w-4' }),
        ),
      ),
    )
  }

  return {
    renderActions,
  }
}
