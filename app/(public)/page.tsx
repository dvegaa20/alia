import { type Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedOrgs, getTopCategoriesWithOrgs } from '@/server/actions'
import {
  HeroSection,
  CategoryFilters,
  CategoryCarousel,
  TrustSection,
  FeaturesSection,
  OrganizationCard,
} from '@/components/public'
import { Button } from '@/components/ui/button'
import type { OrganizationCardProps } from '@/types'

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Encuentra y apoya iniciativas sociales verificadas en México. Explora por categorías como medio ambiente, educación, salud y más.',
  alternates: { canonical: '/' },
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

export default async function Page(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams

  const [{ data: orgs }, { data: topCategories }, { data: youthOrgs }] = await Promise.all([
    getPublishedOrgs({ limit: 100 }),
    getTopCategoriesWithOrgs(),
    getPublishedOrgs({ causeType: 'YOUTH_INITIATIVE', limit: 3 }),
  ])

  const formattedOrgs = (orgs || []).map((org) => ({
    slug: org.slug,
    name: org.name,
    categories: org.categories.map((c) => c.name) || ['Organización'],
    logo: org.logoUrl || '',
  }))

  const newAdditions = (orgs || []).slice(0, 3).map(mapOrgToCard)
  const youthInitiatives = (youthOrgs || []).slice(0, 3).map(mapOrgToCard)

  const activeCategorySlug = searchParams?.category || topCategories?.[0]?.slug || ''
  const activeCategoryData =
    topCategories?.find((c) => c.slug === activeCategorySlug) || topCategories?.[0]

  return (
    <>
      {/* Band 1 — Hero (Merino) */}
      <HeroSection organizations={formattedOrgs} />

      {/* Band 2 — Categorías y Nuevas Adiciones (Pure White) */}
      <section
        id="categorias"
        className="w-full bg-surface border-y border-border/70 py-20 lg:py-28 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-left space-y-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
              Explora por causa
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-foreground">
              Explora por <span className="text-primary">categoría</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-2xl leading-[1.55]">
              Encuentra iniciativas afines a tus intereses y descubre cómo puedes sumar tu apoyo.
            </p>
          </div>

          <CategoryFilters
            categories={topCategories || []}
            activeCategorySlug={activeCategorySlug}
          />

          <div className="mt-8">
            {activeCategoryData && (
              <CategoryCarousel
                categorySlug={activeCategorySlug}
                categoryName={activeCategoryData.name}
                categoryDescription={activeCategoryData.description}
              />
            )}
          </div>

          {/* Nuevas Adiciones */}
          {newAdditions.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
                    Recién sumadas
                  </p>
                  <h3 className="font-sans text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground">
                    Nuevas adiciones al directorio
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-foreground-secondary max-w-xl">
                    Organizaciones e iniciativas que acaban de completar su proceso de verificación.
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/5 px-5 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto"
                >
                  <Link href="/directory">
                    Ver directorio completo
                    <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {newAdditions.map((org) => (
                  <OrganizationCard key={org.slug} {...org} surface="on-white" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Band 3 — Nuestro Alcance: solo estadísticas (Venice Blue) */}
      <FeaturesSection />

      {/* Band 4 — Puente de Confianza + Iniciativas Jóvenes (Merino) */}
      <TrustSection youthInitiatives={youthInitiatives} />
    </>
  )
}
