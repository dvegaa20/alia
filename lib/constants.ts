import type { StatusConfig } from '@/types'

export const ORG_STATUS_CONFIG: StatusConfig = {
  PUBLISHED: {
    label: 'Publicada',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
  DRAFT: {
    label: 'Borrador',
    dotColor: 'bg-amber-500',
    textColor: 'text-amber-700 dark:text-amber-400',
  },
  ARCHIVED: {
    label: 'Archivada',
    dotColor: 'bg-red-400 dark:bg-red-500',
    textColor: 'text-red-600 dark:text-red-400',
  },
}

export const SUGG_STATUS_CONFIG: StatusConfig = {
  PENDING: {
    label: 'Pendiente',
    dotColor: 'bg-amber-500',
    textColor: 'text-amber-700 dark:text-amber-400',
  },
  APPROVED: {
    label: 'Aprobada',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
  REJECTED: {
    label: 'Rechazada',
    dotColor: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-400',
  },
}

export const CATEGORY_LABELS: Record<string, string> = {
  'medio-ambiente': 'Medio Ambiente',
  'Medio Ambiente': 'Medio Ambiente',
  salud: 'Salud',
  Salud: 'Salud',
  educacion: 'Educación',
  Educación: 'Educación',
  animales: 'Bienestar Animal',
  'Bienestar Animal': 'Bienestar Animal',
  social: 'Acción Social',
  'Acción Social': 'Acción Social',
}
