import { type Metadata } from 'next'
import { getPublicImpactStats } from '@/server/data/public-stats'
import { ImpactHero } from '@/components/public/impact/impact-hero'
import { ImpactCategoryCoverage } from '@/components/public/impact/impact-category-coverage'
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

export const revalidate = 600

export default async function ImpactPage() {
  const stats = await getPublicImpactStats()
  const updatedLabel = new Date(stats.lastUpdated).toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  })

  return (
    <div className="min-h-screen">
      <ImpactHero stats={stats} updatedLabel={updatedLabel} />
      <ImpactCategoryCoverage
        categories={stats.categories}
        youthCount={stats.youthInitiatives}
        totalPublished={stats.totalPublished}
      />
      <ImpactPhotos lastUpdatedLabel={updatedLabel} />
    </div>
  )
}
