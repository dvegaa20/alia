/**
 * All 32 states of Mexico.
 * Used as a static reference for the location filter in the directory sidebar.
 */
export const MEXICO_STATES = [
  { slug: 'aguascalientes', name: 'Aguascalientes' },
  { slug: 'baja-california', name: 'Baja California' },
  { slug: 'baja-california-sur', name: 'Baja California Sur' },
  { slug: 'campeche', name: 'Campeche' },
  { slug: 'chiapas', name: 'Chiapas' },
  { slug: 'chihuahua', name: 'Chihuahua' },
  { slug: 'ciudad-de-mexico', name: 'Ciudad de México' },
  { slug: 'coahuila', name: 'Coahuila' },
  { slug: 'colima', name: 'Colima' },
  { slug: 'durango', name: 'Durango' },
  { slug: 'estado-de-mexico', name: 'Estado de México' },
  { slug: 'guanajuato', name: 'Guanajuato' },
  { slug: 'guerrero', name: 'Guerrero' },
  { slug: 'hidalgo', name: 'Hidalgo' },
  { slug: 'jalisco', name: 'Jalisco' },
  { slug: 'michoacan', name: 'Michoacán' },
  { slug: 'morelos', name: 'Morelos' },
  { slug: 'nayarit', name: 'Nayarit' },
  { slug: 'nuevo-leon', name: 'Nuevo León' },
  { slug: 'oaxaca', name: 'Oaxaca' },
  { slug: 'puebla', name: 'Puebla' },
  { slug: 'queretaro', name: 'Querétaro' },
  { slug: 'quintana-roo', name: 'Quintana Roo' },
  { slug: 'san-luis-potosi', name: 'San Luis Potosí' },
  { slug: 'sinaloa', name: 'Sinaloa' },
  { slug: 'sonora', name: 'Sonora' },
  { slug: 'tabasco', name: 'Tabasco' },
  { slug: 'tamaulipas', name: 'Tamaulipas' },
  { slug: 'tlaxcala', name: 'Tlaxcala' },
  { slug: 'veracruz', name: 'Veracruz' },
  { slug: 'yucatan', name: 'Yucatán' },
  { slug: 'zacatecas', name: 'Zacatecas' },
] as const

export type MexicoStateSlug = (typeof MEXICO_STATES)[number]['slug']

/**
 * Helper to find a state by its slug.
 */
export function getStateName(slug: string): string | undefined {
  return MEXICO_STATES.find((s) => s.slug === slug)?.name
}
