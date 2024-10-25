import type { LinkProp } from '../layout/nav-list.vue'

export default function useNavLinks(roleType: string) {
  const links = {
    trainer: [
      {
        title: 'Vehículos',
        label: '',
        icon: 'lucide:user-circle',
        variant: 'ghost',
        href: 'estudiantes',
      },
    ],
    student: [
      {
        title: 'Projects',
        label: '',
        icon: 'lucide:layout-dashboard',
        variant: 'ghost',
        href: 'projects',
      },
      {
        title: 'Reports',
        label: '',
        icon: 'lucide:file-text',
        variant: 'ghost',
      },
    ] as const,
  }

  return links[roleType as keyof typeof links] as LinkProp[]
}
