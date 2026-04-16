import { type Metadata } from 'next'
import Link from 'next/link'
import { getImpactMetrics } from '@/server/actions/analytics'
import { ImpactHero } from '@/components/public/impact/impact-hero'
import { ImpactTopOrgs } from '@/components/public/impact/impact-top-orgs'
import { ImpactTransparency } from '@/components/public/impact/impact-transparency'

export const metadata: Metadata = {
  title: 'Alcance Social',
  description:
    'Datos de impacto sobre el alcance y conexión de Alia — El directorio social de México. Transparencia en tiempo real sobre nuestra labor.',
  alternates: { canonical: '/impacto' },
  openGraph: {
    title: 'Alcance Social | Alia',
    description:
      'Datos de impacto sobre el alcance y conexión de la plataforma Alia. Transparencia sobre personas ayudando y causas descubiertas.',
    type: 'website',
  },
}

export default async function ImpactoPage() {
  const metrics = await getImpactMetrics()

  return (
    <main className="min-h-screen">
      {/* Hero with metric cards */}
      <ImpactHero metrics={metrics} />

      {/* Top 10 organizations */}
      <ImpactTopOrgs topOrgs={metrics.topOrgs} />

      {/* Transparency / methodology */}
      <ImpactTransparency lastUpdated={metrics.lastUpdated} />
    </main>
  )
}
