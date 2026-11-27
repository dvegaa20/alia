import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { OrganizationStatus } from '@/prisma/generated/client'

export interface CategoryCoverage {
  slug: string
  name: string
  count: number
}

export interface PublicImpactStats {
  verifiedOrgs: number
  youthInitiatives: number
  activeNeeds: number
  donatarias: number
  totalPublished: number
  categories: CategoryCoverage[]
  lastUpdated: string
}

export interface SpotlightOrg {
  slug: string
  name: string
  shortDescription: string
  coverImageUrl: string | null
  location: string
  categories: string[]
  causeType: 'ONG' | 'YOUTH_INITIATIVE'
  isDonatariaAutorizada: boolean
  urgentNeed: { title: string; category?: string } | null
  urgentCount: number
}

export interface HomeSpotlight {
  mode: 'urgent' | 'recent'
  orgs: SpotlightOrg[]
}

export interface FeaturedTestimony {
  quote: string
  author: string
  role: string
  orgName: string
  orgSlug: string
  imageUrl: string | null
}

interface RawNeedItem {
  title?: unknown
  category?: unknown
  urgency?: unknown
}

interface RawVolunteering {
  description?: unknown
  activities?: unknown
}

interface RawTestimony {
  quote?: unknown
  author?: unknown
  role?: unknown
}

function countActiveNeedsForOrg(needs: unknown, volunteering: unknown): number {
  let count = 0

  if (Array.isArray(needs)) {
    for (const item of needs as RawNeedItem[]) {
      if (item && typeof item.title === 'string' && item.title.trim().length > 0) {
        count += 1
      }
    }
  }

  if (volunteering && typeof volunteering === 'object' && !Array.isArray(volunteering)) {
    const vol = volunteering as RawVolunteering
    const hasDesc = typeof vol.description === 'string' && vol.description.trim().length > 0
    const hasActivities =
      Array.isArray(vol.activities) &&
      vol.activities.some((a) => typeof a === 'string' && a.trim().length > 0)
    if (hasDesc || hasActivities) {
      count += 1
    }
  }

  return count
}

function extractUrgentNeeds(needs: unknown): { title: string; category?: string }[] {
  if (!Array.isArray(needs)) return []
  const urgent: { title: string; category?: string }[] = []

  for (const item of needs as RawNeedItem[]) {
    if (
      item &&
      item.urgency === 'alta' &&
      typeof item.title === 'string' &&
      item.title.trim().length > 0
    ) {
      urgent.push({
        title: item.title.trim(),
        category:
          typeof item.category === 'string' && item.category.trim().length > 0
            ? item.category.trim()
            : undefined,
      })
    }
  }

  return urgent
}

async function fetchPublicImpactStats(): Promise<PublicImpactStats> {
  const [publishedOrgs, categoriesRaw] = await Promise.all([
    prisma.organization.findMany({
      where: { status: OrganizationStatus.PUBLISHED },
      select: {
        causeType: true,
        isDonatariaAutorizada: true,
        needs: true,
        volunteering: true,
      },
    }),
    prisma.category.findMany({
      select: {
        slug: true,
        name: true,
        _count: {
          select: {
            organizations: {
              where: { status: OrganizationStatus.PUBLISHED },
            },
          },
        },
      },
    }),
  ])

  let verifiedOrgs = 0
  let youthInitiatives = 0
  let activeNeeds = 0
  let donatarias = 0

  for (const org of publishedOrgs) {
    if (org.causeType === 'ONG') verifiedOrgs += 1
    if (org.causeType === 'YOUTH_INITIATIVE') youthInitiatives += 1
    if (org.isDonatariaAutorizada) donatarias += 1
    activeNeeds += countActiveNeedsForOrg(org.needs, org.volunteering)
  }

  const categories: CategoryCoverage[] = categoriesRaw
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      count: c._count.organizations,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)

  return {
    verifiedOrgs,
    youthInitiatives,
    activeNeeds,
    donatarias,
    totalPublished: publishedOrgs.length,
    categories,
    lastUpdated: new Date().toISOString(),
  }
}

const getCachedPublicImpactStats = unstable_cache(fetchPublicImpactStats, ['public-impact-stats'], {
  revalidate: 600,
  tags: ['public-impact-stats'],
})

export async function getPublicImpactStats(): Promise<PublicImpactStats> {
  try {
    return await getCachedPublicImpactStats()
  } catch (error) {
    console.error('[getPublicImpactStats] Error:', error)
    return {
      verifiedOrgs: 0,
      youthInitiatives: 0,
      activeNeeds: 0,
      donatarias: 0,
      totalPublished: 0,
      categories: [],
      lastUpdated: new Date().toISOString(),
    }
  }
}

async function fetchHomeSpotlight(limit: number): Promise<HomeSpotlight> {
  const orgs = await prisma.organization.findMany({
    where: { status: OrganizationStatus.PUBLISHED },
    include: {
      location: true,
      categories: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: 60,
  })

  const mapped = orgs.map((org) => {
    const urgentList = extractUrgentNeeds(org.needs)
    const location = org.location ? `${org.location.city}, ${org.location.state}` : 'México'
    const categories = org.categories.map((c) => c.name)

    return {
      createdAtMs: org.createdAt.getTime(),
      urgentCount: urgentList.length,
      spotlight: {
        slug: org.slug,
        name: org.name,
        shortDescription: org.shortDescription,
        coverImageUrl: org.coverImageUrl,
        location,
        categories: categories.length > 0 ? categories : ['Organización'],
        causeType: org.causeType as 'ONG' | 'YOUTH_INITIATIVE',
        isDonatariaAutorizada: org.isDonatariaAutorizada,
        urgentNeed: urgentList[0] ?? null,
        urgentCount: urgentList.length,
      } satisfies SpotlightOrg,
    }
  })

  const withUrgent = mapped
    .filter((item) => item.urgentCount > 0)
    .sort((a, b) => b.urgentCount - a.urgentCount)
    .map((item) => item.spotlight)

  if (withUrgent.length > 0) {
    const selected = withUrgent.slice(0, limit)
    if (selected.length < 3 && limit > selected.length) {
      const nonUrgent = mapped
        .filter((item) => item.urgentCount === 0)
        .sort((a, b) => b.createdAtMs - a.createdAtMs)
        .slice(0, Math.min(limit, 3) - selected.length)
        .map((item) => item.spotlight)
      selected.push(...nonUrgent)
    }
    return { mode: 'urgent', orgs: selected }
  }

  const recent = mapped
    .sort((a, b) => b.createdAtMs - a.createdAtMs)
    .slice(0, limit)
    .map((item) => item.spotlight)

  return { mode: 'recent', orgs: recent }
}

const getCachedHomeSpotlight = unstable_cache(fetchHomeSpotlight, ['home-spotlight'], {
  revalidate: 600,
  tags: ['public-impact-stats'],
})

export async function getHomeSpotlight(limit = 4): Promise<HomeSpotlight> {
  try {
    return await getCachedHomeSpotlight(limit)
  } catch (error) {
    console.error('[getHomeSpotlight] Error:', error)
    return { mode: 'recent', orgs: [] }
  }
}

async function fetchFeaturedTestimony(): Promise<FeaturedTestimony | null> {
  const orgs = await prisma.organization.findMany({
    where: { status: OrganizationStatus.PUBLISHED },
    select: {
      slug: true,
      name: true,
      impactTestimony: true,
      coverImageUrl: true,
      galleryImages: true,
    },
    orderBy: [{ featured: 'desc' }, { updatedAt: 'desc' }],
    take: 30,
  })

  for (const org of orgs) {
    if (
      org.impactTestimony &&
      typeof org.impactTestimony === 'object' &&
      !Array.isArray(org.impactTestimony)
    ) {
      const t = org.impactTestimony as RawTestimony
      if (typeof t.quote === 'string' && t.quote.trim().length > 0) {
        return {
          quote: t.quote.trim(),
          author: typeof t.author === 'string' && t.author.trim() ? t.author.trim() : org.name,
          role:
            typeof t.role === 'string' && t.role.trim()
              ? t.role.trim()
              : 'Organización verificada',
          orgName: org.name,
          orgSlug: org.slug,
          imageUrl: org.galleryImages[0] ?? org.coverImageUrl ?? null,
        }
      }
    }
  }

  return null
}

const getCachedFeaturedTestimony = unstable_cache(
  fetchFeaturedTestimony,
  ['home-featured-testimony'],
  {
    revalidate: 600,
    tags: ['public-impact-stats'],
  }
)

export async function getFeaturedTestimony(): Promise<FeaturedTestimony | null> {
  try {
    return await getCachedFeaturedTestimony()
  } catch (error) {
    console.error('[getFeaturedTestimony] Error:', error)
    return null
  }
}
