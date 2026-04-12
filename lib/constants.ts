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

export const TAB_FIELD_MAP: Record<string, string> = {
  name: 'sobre',
  slug: 'sobre',
  shortDescription: 'sobre',
  fullDescription: 'sobre',
  logoUrl: 'sobre',
  coverImageUrl: 'sobre',
  foundedYear: 'sobre',
  status: 'sobre',
  featured: 'sobre',
  verified: 'sobre',
  categoryIds: 'sobre',
  galleryImages: 'sobre',
  relevantLinks: 'explorar',
  needs: 'necesidades',
  impactCurrent: 'impacto',
  impactGoal: 'impacto',
  impactType: 'impacto',
  featuredFact: 'impacto',
  secondaryFacts: 'impacto',
  testimony: 'impacto',
  milestone: 'impacto',
  email: 'contacto',
  phone: 'contacto',
  website: 'contacto',
  donationLink: 'contacto',
  location: 'contacto',
  socialLinks: 'contacto',
  officeHours: 'contacto',
}

export const TAB_LABELS: Record<string, string> = {
  sobre: 'Sobre nosotros',
  explorar: 'Explorar',
  necesidades: 'Necesidades',
  impacto: 'Impacto',
  contacto: 'Contacto',
}

export const DAYS = [
  { key: 'monday', label: 'Lunes' },
  { key: 'tuesday', label: 'Martes' },
  { key: 'wednesday', label: 'Miércoles' },
  { key: 'thursday', label: 'Jueves' },
  { key: 'friday', label: 'Viernes' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
]

export const DEFAULT_OFFICE_HOURS = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: null,
  sunday: null,
}
