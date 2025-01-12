import type { LinkProp } from '../layout/nav-list.vue'

export default function useNavLinks(roleType: string) {
  const links = {
    Administrador: [
      {
        title: 'Vehículos',
        label: '',
        icon: 'lucide:car',
        variant: 'ghost',
        href: 'cars',
      },
      {
        title: 'Usuarios',
        label: '',
        icon: 'lucide:user',
        variant: 'ghost',
        href: 'usuarios',
      },
      {
        title: 'Reportes',
        label: '',
        icon: 'lucide:file-bar-chart',
        variant: 'ghost',
        href: 'reports',
      },
      {
        title: 'Configuración',
        label: '',
        icon: 'lucide:settings',
        variant: 'ghost',
        href: 'settings',
        children: [
          {
            title: 'Tarifas',
            href: 'rates',
            icon: 'lucide:dollar-sign',
          },
          {
            title: 'Parámetros',
            href: 'parameters',
            icon: 'lucide:sliders-horizontal',
          },
        ],
      },
    ],
    Empleado: [
      {
        title: 'Vehículos',
        label: '',
        icon: 'lucide:car',
        variant: 'ghost',
        href: 'cars',
      },
      {
        title: 'Alquileres',
        label: '',
        icon: 'lucide:clipboard-list',
        variant: 'ghost',
        href: 'rentals',
      },
    ],
    Cliente: [
      {
        title: 'Vehículos',
        label: '',
        icon: 'lucide:car',
        variant: 'ghost',
        href: 'cars',
      },
      {
        title: 'Mis Alquileres',
        label: '',
        icon: 'lucide:clipboard-list',
        variant: 'ghost',
        href: 'rentals',
      },
    ],
  }

  return links[roleType as keyof typeof links] as LinkProp[]
}
