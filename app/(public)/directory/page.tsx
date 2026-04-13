import { Suspense } from 'react'
import { type Metadata } from 'next'
import { getPublishedOrgs, getAllCategoriesWithCount } from '@/server/actions'
import { SidebarFilters } from '@/components/public/directory/sidebar-filters'
import { ResultsGrid } from '@/components/public/directory/results-grid'
import type { OrganizationCardProps } from '@/components/public/directory/organization-card'
import type { MapPoint } from '@/components/public/directory/map-view'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: 'Directorio de Organizaciones',
  description:
    'Explora el directorio completo de organizaciones sociales verificadas. Filtra por categoría, estado y ciudad.',
  alternates: { canonical: '/directory' },
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

  const [result, categoriesResult] = await Promise.all([
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
  ])

  const categories = categoriesResult.data || []

  const organizations: OrganizationCardProps[] = (result.data || []).map((org) => ({
    slug: org.slug,
    name: org.name,
    description: org.shortDescription,
    category: org.categories?.[0]?.name || 'Organización',
    location: org.location ? `${org.location.city}, ${org.location.state}` : 'México',
    coverImage: org.coverImageUrl || '/images/directorio/card-forest.jpg',
    logoImage: org.logoUrl || '/images/directorio/logo-forest.jpg',
    verified: org.verified,
  }))

  // Build map points from organizations that have coordinates
  const mapPoints: MapPoint[] = (result.data || [])
    .filter((org) => org.location?.latitude != null && org.location?.longitude != null)
    .map((org) => ({
      slug: org.slug,
      name: org.name,
      category: org.categories?.[0]?.name || 'Organización',
      location: org.location ? `${org.location.city}, ${org.location.state}` : 'México',
      coordinates: [org.location!.longitude!, org.location!.latitude!] as [number, number],
      logoImage: org.logoUrl || '/images/directorio/logo-forest.jpg',
      verified: org.verified,
    }))

  const meta = result.meta || { total: 0, page: 1, limit: 12, totalPages: 0 }

  return (
    <SidebarProvider>
      <div className="pt-8 pb-12 w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-6 lg:gap-12">
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
          <div className="lg:hidden mb-6 flex items-center justify-between bg-muted/30 p-2 rounded-xl border border-border/50">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="font-semibold text-sm">Filtros</span>
            </div>
            {meta.total > 0 && (
              <span className="text-xs font-medium text-muted-foreground mr-3">
                {meta.total} resultados
              </span>
            )}
          </div>
          <ResultsGrid
            organizations={organizations}
            mapPoints={mapPoints}
            total={meta.total}
            currentPage={meta.page}
            totalPages={meta.totalPages}
            searchQuery={query}
            sort={sort}
          />
        </div>
      </div>
    </SidebarProvider>
  )
}
