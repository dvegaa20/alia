import fs from 'node:fs'
import path from 'node:path'
import { type Metadata } from 'next'
import {
  getFeaturedTestimony,
  getHomeSpotlight,
  getPublicImpactStats,
} from '@/server/data/public-stats'
import {
  AudiencePathsSection,
  CommunityCtaSection,
  HeroSection,
  ReachSection,
  UrgentNeedsSection,
} from '@/components/public'
import { HERO_VIDEOS, type ResolvedHeroVideo } from '@/components/public/home/hero-videos'

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Encuentra y apoya iniciativas sociales verificadas en México. Explora por categorías como medio ambiente, educación, salud y más.',
  alternates: { canonical: '/' },
}

export const revalidate = 600

function resolveHeroVideos(): ResolvedHeroVideo[] {
  const publicDir = path.join(process.cwd(), 'public')
  return HERO_VIDEOS.map((item) => {
    const relativePath = item.src.startsWith('/') ? item.src.slice(1) : item.src
    const hasVideoFile = fs.existsSync(path.join(publicDir, relativePath))
    return { ...item, hasVideoFile }
  })
}

export default async function Page() {
  const heroVideos = resolveHeroVideos()
  const [stats, spotlight, testimony] = await Promise.all([
    getPublicImpactStats(),
    getHomeSpotlight(4),
    getFeaturedTestimony(),
  ])

  return (
    <>
      <HeroSection heroVideos={heroVideos} />
      <UrgentNeedsSection spotlight={spotlight} categories={stats.categories} />
      <AudiencePathsSection
        verifiedCount={stats.verifiedOrgs}
        youthCount={stats.youthInitiatives}
        donatariaCount={stats.donatarias}
      />
      <ReachSection stats={stats} />
      <CommunityCtaSection testimony={testimony} />
    </>
  )
}
