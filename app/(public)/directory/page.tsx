import { Suspense } from 'react'
import { type Metadata } from 'next'
import { getPublishedOrgs, getAllCategoriesWithCount } from '@/server/actions'
import { SidebarFilters } from '@/components/public/directory/sidebar-filters'
import { ResultsGrid } from '@/components/public/directory/results-grid'
import { DirectoryShowcase } from '@/components/public/directory/directory-showcase'
import type { OrganizationCardProps } from '@/components/public/directory/organization-card'
import type { MapPoint } from '@/components/public/directory/map-view'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: 'Directorio de Organizaciones',
  description:
    'Explora el directorio completo de organizaciones sociales verificadas. Filtra por categoría, estado y ciudad.',
  alternates: { canonical: '/directory' },
}

function hasUrgentNeeds(needs: unknown): boolean {
  return (
    Array.isArray(needs) &&
    needs.some(
      (n: { title?: string; urgency?: string }) => Boolean(n?.title) && n?.urgency === 'alta'
    )
  )
}

function mapOrgToCard(org: {
  slug: string
  name: string
  shortDescription: string
  categories?: { name: string }[]
  location?: { city: string; state: string } | null
  coverImageUrl?: string | null
  logoUrl?: string | null
  verified: boolean
  causeType: string
  isDonatariaAutorizada: boolean
  needs?: unknown
}): OrganizationCardProps {
  return {
    slug: org.slug,
    name: org.name,
    description: org.shortDescription,
    categories: org.categories?.map((c) => c.name) || ['Organización'],
    location: org.location ? `${org.location.city}, ${org.location.state}` : 'México',
    coverImage: org.coverImageUrl || '/images/landscape3.jpg',
    logoImage: org.logoUrl || '',
    verified: org.verified,
    causeType: org.causeType as 'ONG' | 'YOUTH_INITIATIVE',
    isDonatariaAutorizada: org.isDonatariaAutorizada,
    hasUrgentNeeds: hasUrgentNeeds(org.needs),
  }
}

export default async function DirectoryPage(props: {
  searchParams: Promise<{
    q?: string
    category?: string
    page?: string
    state?: string
    city?: string
    verified?: string
    sort?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.q || ''
  const page = Number(searchParams?.page) || 1
  const categorySlug = searchParams?.category
  const state = searchParams?.state
  const city = searchParams?.city
  const verified = searchParams?.verified === 'true' ? true : undefined
  const sort = searchParams?.sort

  const [result, categoriesResult, youthResult, newAdditionsResult] = await Promise.all([
    getPublishedOrgs({
      query: query || undefined,
      categorySlug,
      page,
      limit: 12,
      state,
      city,
      verified,
      sort,
    }),
    getAllCategoriesWithCount(),
    getPublishedOrgs({
      causeType: 'YOUTH_INITIATIVE',
      limit: 6,
    }),
    getPublishedOrgs({
      limit: 6,
    }),
  ])

  const categories = categoriesResult.data || []

  const organizations: OrganizationCardProps[] = (result.data || []).map(mapOrgToCard)
  const youthInitiatives: OrganizationCardProps[] = (youthResult.data || []).map(mapOrgToCard)
  const newAdditions: OrganizationCardProps[] = (newAdditionsResult.data || []).map(mapOrgToCard)

  const mapPoints: MapPoint[] = (result.data || [])
    .filter((org) => org.location?.latitude != null && org.location?.longitude != null)
    .map((org) => ({
      slug: org.slug,
      name: org.name,
      categories: org.categories?.map((c) => c.name) || ['Organización'],
      location: org.location ? `${org.location.city}, ${org.location.state}` : 'México',
      coordinates: [org.location!.longitude!, org.location!.latitude!] as [number, number],
      logoImage: org.logoUrl || '',
      verified: org.verified,
    }))

  const meta = result.meta || { total: 0, page: 1, limit: 12, totalPages: 0 }

  return (
    <SidebarProvider>
      <div
        data-nav-theme="light"
        className="pt-28 pb-20 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col lg:flex-row gap-6 lg:gap-10"
      >
        <Suspense>
          <SidebarFilters
            searchQuery={query}
            categories={categories}
            activeCategorySlug={categorySlug}
            activeState={state}
            activeCity={city}
            activeVerified={verified}
          />
        </Suspense>

        <div className="flex-1 min-w-0 w-full">
          <div className="lg:hidden mb-6 flex items-center justify-between bg-[#FAF7F0] p-2.5 rounded-2xl border border-[#DFD5C0]">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="font-sans font-medium text-sm text-[#0C354C]">Filtros</span>
            </div>
            {meta.total > 0 && (
              <span className="font-mono text-xs text-[#0C354C]/60 mr-2 tabular-nums">
                {meta.total} resultados
              </span>
            )}
          </div>

          <DirectoryShowcase youthInitiatives={youthInitiatives} newAdditions={newAdditions}>
            <ResultsGrid
              organizations={organizations}
              mapPoints={mapPoints}
              total={meta.total}
              currentPage={meta.page}
              totalPages={meta.totalPages}
              searchQuery={query}
              sort={sort}
            />
          </DirectoryShowcase>
        </div>
      </div>
    </SidebarProvider>
  )
}
