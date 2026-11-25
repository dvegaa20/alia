import { type Metadata } from 'next'
import { getImpactMetrics } from '@/server/actions/analytics'
import { ImpactHero } from '@/components/public/impact/impact-hero'
import { ImpactTopOrgs } from '@/components/public/impact/impact-top-orgs'
import { ImpactPhotos } from '@/components/public/impact/impact-photos'

export const metadata: Metadata = {
  title: 'Alcance Social',
  description:
    'Datos de impacto sobre nuestro alcance en México, actualizados constantemente para garantizar total transparencia en nuestra labor comunitaria.',
  alternates: { canonical: '/impact' },
  openGraph: {
    title: 'Alcance Social | Alia',
    description:
      'Datos de impacto sobre nuestro alcance en México, actualizados constantemente para garantizar total transparencia en nuestra labor comunitaria.',
    type: 'website',
  },
}

export default async function ImpactPage() {
  const metrics = await getImpactMetrics()

  return (
    <div className="min-h-screen">
      <ImpactHero metrics={metrics} />
      <ImpactTopOrgs topOrgs={metrics.topOrgs} />
      <ImpactPhotos lastUpdated={metrics.lastUpdated} />
    </div>
  )
}
