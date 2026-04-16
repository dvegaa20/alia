import { type Metadata } from 'next'
import Link from 'next/link'
import { getImpactMetrics } from '@/server/actions/analytics'
import { ImpactHero } from '@/components/public/impact/impact-hero'
import { ImpactTopOrgs } from '@/components/public/impact/impact-top-orgs'
import { ImpactTransparency } from '@/components/public/impact/impact-transparency'

export const metadata: Metadata = {
  title: 'Impacto Social',
  description:
    'Métricas reales de alcance y conexión de Alia — El directorio social de México. Datos actualizados cada hora desde Google Analytics 4.',
  alternates: { canonical: '/impacto' },
  openGraph: {
    title: 'Impacto Social | Alia',
    description:
      'Métricas reales de alcance y conexión de la plataforma Alia. Usuarios únicos, conexiones directas y organizaciones más visitadas.',
    type: 'website',
  },
}

export default async function ImpactoPage() {
  const metrics = await getImpactMetrics()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero with metric cards */}
      <ImpactHero metrics={metrics} />

      {/* Top 10 organizations */}
      <ImpactTopOrgs topOrgs={metrics.topOrgs} />

      {/* Transparency / methodology */}
      <ImpactTransparency lastUpdated={metrics.lastUpdated} />

      {/* CTA back to directory */}
      <section className="px-4 sm:px-8 py-20 text-center">
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-headline text-base"
        >
          Explorar el directorio →
        </Link>
      </section>
    </main>
  )
}
