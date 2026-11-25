import fs from 'node:fs'
import path from 'node:path'
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
import { HERO_VIDEOS, type ResolvedHeroVideo } from '@/components/public/home/hero-videos'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import { SectionTransition } from '@/components/public/motion/section-transition'
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

function resolveHeroVideos(): ResolvedHeroVideo[] {
  const publicDir = path.join(process.cwd(), 'public')
  return HERO_VIDEOS.map((item) => {
    const relativePath = item.src.startsWith('/') ? item.src.slice(1) : item.src
    const hasVideoFile = fs.existsSync(path.join(publicDir, relativePath))
    return { ...item, hasVideoFile }
  })
}

export default async function Page(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams

  const [{ data: orgs }, { data: topCategories }, { data: youthOrgs }] = await Promise.all([
    getPublishedOrgs({ limit: 100 }),
    getTopCategoriesWithOrgs(),
    getPublishedOrgs({ causeType: 'YOUTH_INITIATIVE', limit: 3 }),
  ])

  const heroVideos = resolveHeroVideos()

  const newAdditions = (orgs || []).slice(0, 3).map(mapOrgToCard)
  const youthInitiatives = (youthOrgs || []).slice(0, 3).map(mapOrgToCard)

  const activeCategorySlug = searchParams?.category || topCategories?.[0]?.slug || ''
  const activeCategoryData =
    topCategories?.find((c) => c.slug === activeCategorySlug) || topCategories?.[0]

  return (
    <>
      {/* Screen 1 — Full-Viewport Video Hero (Deep Harbor) */}
      <HeroSection heroVideos={heroVideos} />

      {/* Screen 2 — Categorías y Nuevas Adiciones (Merino) */}
      <section
        id="categorias"
        data-nav-theme="light"
        className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#F5EEDD] border-b border-[#DFD5C0] py-20 lg:py-24 scroll-mt-0"
      >
        <SectionTransition>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
            <GsapReveal className="mb-10 text-left space-y-3">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                Explora por causa
              </p>
              <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-normal text-[#0C354C]">
                Explora por{' '}
                <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
                  categoría
                </span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl leading-[1.55]">
                Encuentra iniciativas afines a tus intereses y descubre cómo puedes sumar tu apoyo.
              </p>
            </GsapReveal>

            <CategoryFilters
              categories={topCategories || []}
              activeCategorySlug={activeCategorySlug}
            />

            <GsapReveal className="mt-8">
              {activeCategoryData && (
                <CategoryCarousel
                  categorySlug={activeCategorySlug}
                  categoryName={activeCategoryData.name}
                  categoryDescription={activeCategoryData.description}
                />
              )}
            </GsapReveal>

            {/* Nuevas Adiciones */}
            {newAdditions.length > 0 && (
              <div className="mt-20 pt-16 border-t border-[#DFD5C0] space-y-8">
                <GsapReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                      Recién sumadas
                    </p>
                    <h3 className="font-sans font-light text-2xl sm:text-4xl tracking-normal leading-[1.1] text-[#0C354C]">
                      Nuevas adiciones al{' '}
                      <span className="font-serif italic font-normal text-[#16587B]">
                        directorio
                      </span>
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[#0C354C]/80 max-w-xl">
                      Organizaciones e iniciativas que acaban de completar su proceso de
                      verificación.
                    </p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-[#16587B] bg-transparent text-[#16587B] hover:bg-[#16587B] hover:text-white px-6 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto shadow-none transition-colors"
                  >
                    <Link href="/directory">
                      Ver directorio completo
                      <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
                    </Link>
                  </Button>
                </GsapReveal>

                <GsapReveal
                  staggerSelector="[data-reveal-card]"
                  stagger={0.1}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
                >
                  {newAdditions.map((org) => (
                    <div key={org.slug} data-reveal-card className="h-full">
                      <OrganizationCard {...org} surface="on-merino" />
                    </div>
                  ))}
                </GsapReveal>
              </div>
            )}
          </div>
        </SectionTransition>
      </section>

      {/* Screen 3 — Nuestro Alcance: estadísticas con conteo animado (Deep Harbor) */}
      <FeaturesSection />

      {/* Screen 4 — Puente de Confianza + Iniciativas Jóvenes (Merino) */}
      <TrustSection youthInitiatives={youthInitiatives} />
    </>
  )
}
